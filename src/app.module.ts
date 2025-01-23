import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsModule } from './analytics/analytics.module';
import { AnalyticsRecord } from './analytics/models/analytics-record.entity';
import { ShortUrl } from './short-url/models/short-url.entity';
import { ShortUrlModule } from './short-url/short-url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'url-shortener',
      autoLoadEntities: true,
      synchronize: true,
      entities: [ShortUrl, AnalyticsRecord],
    }),
    ShortUrlModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
