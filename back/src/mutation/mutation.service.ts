import { Injectable } from '@nestjs/common';
import { FakeDb } from 'src/fakedb/fakedb.service';
import { Mutation, ValidationState } from './mutation.type';

@Injectable()
export class MutationService {

  constructor(private readonly database: FakeDb) { }

  public async list(): Promise<Mutation[]> {
    return this.database.list();
  }
  public async get(id: string): Promise<Mutation> {
    return this.database.getById(id);
  }

  public async updateValidationState(id: string, newState: ValidationState) {
    return this.database.partialUpdateById(id, { state: newState });
  }
}