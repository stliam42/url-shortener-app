import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsRecord } from './models/analytics-record.entity';

@Module({
  providers: [AnalyticsService],
  exports: [AnalyticsService],
  imports: [TypeOrmModule.forFeature([AnalyticsRecord])],
})
export class AnalyticsModule {}
