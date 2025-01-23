import { AnalyticsRecordDto } from '../../analytics/dto/analytics-record.dto';

export class AnalyticsDto {
  clickCount: number;
  analytics: AnalyticsRecordDto[];
}
