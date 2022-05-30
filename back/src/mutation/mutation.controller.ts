import { Controller, Get, NotFoundException, Param, ParseUUIDPipe, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EnumValidationPipe } from 'src/util/EnumValidationPipe';
import { MutationService } from './mutation.service';
import { Mutation, ValidationState } from './mutation.type';

@ApiTags('mutation')
@Controller('api/mutation')
export class MutationController {

  constructor(private readonly service: MutationService) { }

  @ApiOperation({ summary: 'List all mutations of the patient' })
  @Get()
  async list(): Promise<Mutation[]> {
    return this.service.list();
  }

  @ApiOperation({ summary: 'Return a specific mutation of the patient' })
  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string,): Promise<Mutation> {
    const mutation = await this.service.get(id);
    if (!mutation) {
      throw new NotFoundException(`Mutation not found: ${id}`);
    } else {
      return mutation;
    }
  }

  @ApiOperation({ summary: 'Update the validation state of a mutation' })
  @Put(":id/state")
  async updateState(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('state', new EnumValidationPipe(ValidationState)) state: ValidationState) {
    const mutation = await this.service.updateValidationState(id, state);
    if (!mutation) {
      throw new NotFoundException(`Mutation not found: ${id}`);
    } else {
      return;
    }
  }
}