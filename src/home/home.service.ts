import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HomeService {
  constructor(@InjectRepository(Log) private logRepository: Repository<Log>) {}

  async description() {
    const lastLog = await this.logRepository.find({
      order: { idLog: 'DESC' },
      take: 5,
    });

    return {
      actividades: lastLog,
    };
  }
}
