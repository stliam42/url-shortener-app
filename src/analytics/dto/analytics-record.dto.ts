import { Expose } from 'class-transformer';

export class AnalyticsRecordDto {
  @Expose()
  ipAddress: string;

  @Expose()
  accessDate: Date;
}
