import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsModule } from '../analytics/analytics.module';
import { ShortUrl } from './models/short-url.entity';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlService } from './short-url.service';

@Module({
  controllers: [ShortUrlController],
  providers: [ShortUrlService],
  imports: [AnalyticsModule, TypeOrmModule.forFeature([ShortUrl])],
})
export class ShortUrlModule {}
