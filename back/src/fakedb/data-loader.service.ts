import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { ApiConfigService } from 'src/configuration/ApiConfigService';
import { Frequency, Mutation, Support, ValidationState } from 'src/mutation/mutation.type';
import { FakeDb } from './fakedb.service';

@Injectable()
export class DataLoader {

  logger = new Logger(DataLoader.name);

  constructor(
    private readonly apiConfiguration: ApiConfigService,
    private readonly fakeDb: FakeDb,
  ) { }

  async loadData(): Promise<void> {

    const filename = this.apiConfiguration.getDataSource();
    this.logger.log(`load data from '${filename}' ...`);

    const data = JSON.parse(readFileSync(filename, 'utf-8'));
    for (const input of data) {
      const mutation: Mutation = {
        annotations: input.annot.map((annot: any) => ({
          gene: annot.subject.symbol,
          mutation: annot.changes.HGVSp,
          pathogenicity: annot.pathogenicity.CADD_phred,
        })),
        coordinates: {
          region: input.coord.region,
          position: input.coord.pos
        },
        maxFrequency: this.getMaxFrequency(input.pop_AF),
        state: ValidationState.NOT_VALIDATED,
        supports: input.supports.map((support: any) => this.parseSupport(support)),
      }
      const saved = await this.fakeDb.addOne(mutation);
      this.logger.log(`Add mutation, id:${saved.id}`);
    }
  }

  private getMaxFrequency(input: any[]): Frequency | undefined {
    if (input.length == 0) {
      return undefined;
    }

    let max = input[0];
    for (let i = 1; i < input.length; i++) {
      const challenger = input[i];
      if (max.AF < challenger.AF) {
        max = challenger;
      }
    }

    return {
      frequency: max.AF,
      population: max.name,
      source: max.source,
    }
  }

  private parseSupport(input: any): Support {
    if (input.libraries.length == 0) {
      throw new Error("empty support[].libraries")
    }
    const firstSample = input.libraries[0];
    return {
      filters: input.filters,
      sample: {
        count: firstSample.depth,
        name: firstSample.name,
        positiveCount: firstSample.alt_depth,
      },
      source: input.source,
    };
  }
}
