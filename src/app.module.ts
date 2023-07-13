import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Aaa } from './entity/aaa.entity';
import { PersonModule } from './person/person.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [TypeOrmModule.forRoot({type: "mysql",
  host: "mysql-container",
  port: 3306,
  username: "root",
  password: "123456",
  database: "aaa",
  synchronize: true,
  logging: true,
  entities: [Aaa],
  poolSize: 10,
  connectorPackage: 'mysql2',
  extra: {
      authPlugin: 'sha256_password',
  }}), RedisModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
