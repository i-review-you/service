import { Module } from '@nestjs/common';
import { MyPageService } from './mypage.service';
import { MyPageController } from './mypage.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [MyPageController],
  providers: [AuthService, MyPageService],
})
export class MyPageModule {}
