import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TimestampToTime = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const timestamp = request.query[data];
    if (!timestamp) {
      return null;
    }
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  },
);
