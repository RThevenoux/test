import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from './ApiConfigService';
import configuration from './configuration';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  })],
  providers: [ApiConfigService],
  exports: [ApiConfigService]
})
export class ConfigurationModule { }
