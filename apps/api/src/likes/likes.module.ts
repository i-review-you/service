import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [LikesController],
  providers: [AuthService, LikesService],
})
export class LikesModule {}
