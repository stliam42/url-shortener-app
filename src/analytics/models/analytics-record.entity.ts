import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShortUrl } from '../../short-url/models/short-url.entity';

@Entity()
export class AnalyticsRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ipAddress: string;

  @CreateDateColumn()
  accessDate: Date;

  @ManyToOne(() => ShortUrl, (shortUrl) => shortUrl.analytics, {
    onDelete: 'CASCADE',
  })
  shortUrl: ShortUrl;
}
