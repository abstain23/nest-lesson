import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [{
    provide: 'REDIS_CLIENT',
    async useFactory() {
      const client = createClient({
        socket: {
          host: 'redis-container',
          port: 6379
        }
      })
      await client.connect()
      return client
    }
  }],
  exports: ['REDIS_CLIENT']
})
export class RedisModule {}