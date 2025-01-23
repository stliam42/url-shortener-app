import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { ShortUrl } from '../short-url/models/short-url.entity';
import { AnalyticsRecordDto } from './dto/analytics-record.dto';
import { AnalyticsRecord } from './models/analytics-record.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsRecord)
    private readonly analyticsRepository: Repository<AnalyticsRecord>,
  ) {}

  async addRecord(shortUrl: ShortUrl, ipAddress: string) {
    const record: AnalyticsRecord = this.analyticsRepository.create({
      shortUrl,
      ipAddress,
    });
    await this.analyticsRepository.save(record);
  }

  async getAnalytics(
    shortUrlId: number,
    limit: number,
  ): Promise<AnalyticsRecordDto[]> {
    const analytics = await this.analyticsRepository.find({
      where: { shortUrl: { id: shortUrlId } },
      order: { accessDate: 'DESC' },
      take: limit,
    });
    return plainToInstance(AnalyticsRecordDto, analytics, {
      excludeExtraneousValues: true,
    });
  }
}
