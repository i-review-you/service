import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MeController, UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UsersController, MeController],
  providers: [AuthService, UsersService],
})
export class UsersModule {}
