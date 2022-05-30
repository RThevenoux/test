import { Module } from '@nestjs/common';
import { FakeDbModule } from 'src/fakedb/fakedb.module';
import { MutationController } from './mutation.controller';
import { MutationService } from './mutation.service';

@Module({
  imports: [FakeDbModule],
  controllers: [MutationController],
  providers: [MutationService],
})
export class MutationModule { }