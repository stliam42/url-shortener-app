import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUrl, Length } from 'class-validator';

export class CreateShortUrlDto {
  @IsUrl()
  originalUrl: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expiresAt?: Date;

  @IsOptional()
  @Length(3, 20)
  alias?: string;
}
