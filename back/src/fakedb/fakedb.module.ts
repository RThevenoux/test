import { Module } from '@nestjs/common';
import { ConfigurationModule } from 'src/configuration/configuration.module';
import { DataLoader } from './data-loader.service';
import { FakeDb } from './fakedb.service';

@Module({
  imports: [ConfigurationModule],
  providers: [DataLoader, FakeDb],
  exports: [FakeDb]
})
export class FakeDbModule { }