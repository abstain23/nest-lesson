import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SessionService {
  @Inject(RedisService)
  private redisService: RedisService;

  async setSession(sId: string, value: Record<string, any>, ttl = 30 * 60) {
    if (!sId) {
      sId = this.generateSid()
    }

    await this.redisService.hashSet(`sid_${sId}`, value, ttl)
    return sId
  }

  async getSession<SessionType extends Record<string,any>>(sid: string): Promise<SessionType>;
  async getSession(sId: string) {
    return await this.redisService.hashGet(`sid_${sId}`)
  }

  generateSid() {
    return Math.random().toString().slice(2, 12);
  }
}
