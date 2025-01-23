import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { ShortUrlService } from './short-url.service';

@Controller()
export class ShortUrlController {
  private readonly ANALYTICS_LIMIT: number =
    parseInt(process.env.ANALYTICS_LIMIT, 10) || 5;

  constructor(private readonly urlService: ShortUrlService) {}

  @Post('shorten')
  async createShortUrl(@Body() createShortUrlDto: CreateShortUrlDto) {
    const shortUrl = await this.urlService.createShortUrl(createShortUrlDto);
    return { shortUrl };
  }

  @Get(':shortUrl')
  async redirectToOriginal(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const originalUrl = await this.urlService.handleRedirect(shortUrl, req.ip);
    return res.redirect(originalUrl);
  }

  @Delete('delete/:shortUrl')
  deleteShortUrl(@Param('shortUrl') shortUrl: string) {
    this.urlService.deleteShortUrl(shortUrl);
    return { massage: 'URL has been deleted' };
  }

  @Get('info/:shortUrl')
  getShortUrlInfo(@Param('shortUrl') shortUrl: string) {
    return this.urlService.getShortUrlInfo(shortUrl);
  }

  @Get('analytics/:shortUrl')
  getAnalytics(
    @Param('shortUrl') shortUrl: string,
    @Query('limit') limit: number,
  ) {
    const parsedLimit = limit
      ? Math.max(1, parseInt(limit.toString(), 10))
      : this.ANALYTICS_LIMIT;
    return this.urlService.getAnalytics(shortUrl, parsedLimit);
  }
}
