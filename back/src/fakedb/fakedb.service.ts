import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Mutation } from 'src/mutation/mutation.type';

@Injectable()
export class FakeDb {

  private map = new Map<string, Mutation>()

  public async addOne(mutation: Mutation): Promise<Mutation> {
    const clone = this.clone(mutation);

    const id = randomUUID();
    clone.id = id;

    this.map.set(id, clone);
    return this.clone(clone);
  }

  public async list(): Promise<Mutation[]> {
    return [...this.map.values()].map(mutation => this.clone(mutation));
  }

  public async getById(id: string): Promise<Mutation> {
    const mutation = this.map.get(id);
    if (!mutation) {
      return undefined;
    }
    return this.clone(mutation);
  }

  public async partialUpdateById(id: string, newValue: Partial<Mutation>): Promise<Mutation> {
    const mutation = this.map.get(id);
    if (!mutation) {
      return undefined;
    }

    if (newValue.annotations) {
      mutation.annotations = this.clone(newValue.annotations);
    }
    if (newValue.maxFrequency) {
      mutation.maxFrequency = this.clone(newValue.maxFrequency);
    }
    if (newValue.coordinates) {
      mutation.coordinates = this.clone(newValue.coordinates);
    }
    if (newValue.state) {
      mutation.state = newValue.state;
    }
    if (newValue.supports) {
      mutation.supports = newValue.supports;
    }
    return this.clone(mutation);
  }

  private clone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
  }
}