import { Module } from '@nestjs/common';
import { PermissionGuard } from 'src/permissions.guard';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PermissionGuard],
  exports: [UserService,PermissionGuard]
})
export class UserModule {}
