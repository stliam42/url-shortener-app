import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsService } from '../analytics/analytics.service';
import {
  AliasAlreadyExistsException,
  UrlExpiredException,
  UrlNotFoundException,
} from '../common/exceptions/short-url-exceptions';
import { generateRandomHash } from '../utils/hash.util';
import { AnalyticsDto } from './dto/analytics.dto';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UrlInfoDto } from './dto/url-info.dto';
import { ShortUrl } from './models/short-url.entity';

@Injectable()
export class ShortUrlService {
  constructor(
    @InjectRepository(ShortUrl)
    private readonly urlRepository: Repository<ShortUrl>,
    private readonly analyticsService: AnalyticsService,
  ) {}

  private readonly SHORT_URL_LENGTH: number =
    parseInt(process.env.SHORT_URL_LENGTH, 10) || 6;

  async createShortUrl(dto: CreateShortUrlDto): Promise<string> {
    if (
      dto.alias &&
      (await this.urlRepository.exists({ where: { shortUrl: dto.alias } }))
    ) {
      throw new AliasAlreadyExistsException(dto.alias);
    }
    const shortUrl: string = dto.alias ?? (await this.generateUniqueShortUrl());

    const url: ShortUrl = this.urlRepository.create({
      shortUrl,
      ...dto,
    });
    await this.urlRepository.save(url);
    return shortUrl;
  }

  async handleRedirect(shortUrl: string, ipAddress: string): Promise<string> {
    const url: ShortUrl = await this.getUrl(shortUrl);
    if (this.isExpired(url)) {
      throw new UrlExpiredException(shortUrl);
    }

    await this.urlRepository.increment({ shortUrl }, 'clickCount', 1);
    await this.analyticsService.addRecord(url, ipAddress);
    return url.originalUrl;
  }

  async deleteShortUrl(shortUrl: string): Promise<void> {
    await this.urlRepository.delete({ shortUrl });
  }

  async getShortUrlInfo(shortUrl: string): Promise<UrlInfoDto> {
    const url: ShortUrl = await this.getUrl(shortUrl);
    return this.getUrlInfoDto(url);
  }

  async getAnalytics(
    shortUrl: string,
    limit: number = 5,
  ): Promise<AnalyticsDto> {
    const url = await this.getUrl(shortUrl);
    const analytics = await this.analyticsService.getAnalytics(url.id, limit);
    return {
      clickCount: url.clickCount,
      analytics,
    };
  }

  private async getUrl(shortUrl: string): Promise<ShortUrl> {
    const url: ShortUrl = await this.urlRepository.findOne({
      where: { shortUrl },
    });
    if (!url) {
      throw new UrlNotFoundException(shortUrl);
    }
    return url;
  }

  private async generateUniqueShortUrl(): Promise<string> {
    let shortUrl: string;
    let isUnique: boolean;
    while (!isUnique) {
      shortUrl = generateRandomHash(this.SHORT_URL_LENGTH);
      isUnique = !(await this.urlRepository.exists({ where: { shortUrl } }));
    }
    return shortUrl;
  }

  private isExpired(url: ShortUrl) {
    if (url.expiresAt) {
      return url.expiresAt < new Date();
    }
    return false;
  }

  private getUrlInfoDto(url: ShortUrl): UrlInfoDto {
    return {
      shortUrl: url.shortUrl,
      originalUrl: url.originalUrl,
      clickCount: url.clickCount,
      ...(url.expiresAt && { expiresAt: url.expiresAt }),
    };
  }
}
