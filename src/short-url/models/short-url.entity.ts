import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnalyticsRecord } from '../../analytics/models/analytics-record.entity';

@Entity()
export class ShortUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('short-url-idx', { unique: true })
  @Column()
  shortUrl: string;

  @Column()
  originalUrl: string;

  @Column({ default: 0 })
  clickCount: number;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @OneToMany(() => AnalyticsRecord, (analytics) => analytics.shortUrl, {
    cascade: true,
  })
  analytics: AnalyticsRecord[];

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
