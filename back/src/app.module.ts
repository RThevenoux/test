import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { FakeDbModule } from './fakedb/fakedb.module';
import { MutationModule } from './mutation/mutation.module';

@Module({
  imports: [
    ConfigurationModule,
    FakeDbModule,
    MutationModule,
  ]
})
export class AppModule { }
