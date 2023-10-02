import { ValueTransformer } from 'typeorm';

export class TimestampTransformer implements ValueTransformer {
  to(value: number): Date {
    if (typeof value === 'number') {
      return new Date(value * 1000);
    }
    return value;
  }

  from(value: Date): number {
    if (value instanceof Date) {
      return Math.floor(value.getTime() / 1000);
    }
    return value;
  }
}
