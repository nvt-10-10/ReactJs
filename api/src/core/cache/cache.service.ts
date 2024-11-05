import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async set(key: string, value: any, ttl: number = 60 * 60 * 1000) {
    const maxTtl = Number.MAX_SAFE_INTEGER;
    const ttlToUse = ttl !== undefined ? Math.min(ttl, maxTtl) : undefined;
    await this.cacheManager.set(key, value, ttlToUse);
  }

  public async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
  }

  public async del(key: string) {
    await this.cacheManager.del(key);
  }

  public async reset(): Promise<void> {
    await this.cacheManager.reset();
  }
}
