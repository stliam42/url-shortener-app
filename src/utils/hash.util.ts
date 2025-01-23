import { randomBytes } from 'crypto';

export function generateRandomHash(length: number = 6): string {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}
