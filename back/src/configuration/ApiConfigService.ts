import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {

  constructor(private configService: ConfigService) { }

  getPort(): number {
    return this.configService.get('port');
  }

  getDataSource():string{
    return this.configService.get('dataSource');
  }
}
