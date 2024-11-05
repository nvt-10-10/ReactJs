import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CACHE_KEY } from '../decorator/cache.decorator';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CustomCacheInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly cacheService: CacheService, // Sử dụng CacheService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const key = this.reflector.get<string>(CACHE_KEY, context.getHandler());
    if (!key) {
      return next.handle();
    }

    return from(this.cacheService.get(key)).pipe(
      switchMap((cachedValue) => {
        if (cachedValue) {
          return from(Promise.resolve(cachedValue));
        }
        return next.handle().pipe(
          switchMap((response) => {
            this.cacheService.set(key, response, 3600 * 1000); // Cache for 1 hour
            return from(Promise.resolve(response));
          }),
        );
      }),
    );
  }
}
