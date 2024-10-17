import {
  Controller,
  UseGuards,
  Get,
  Put,
  Body,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { MyPageService } from './mypage.service';
import { GetCurrentUser } from '../auth/auth.decorator';

@Controller('mypage')
export class MyPageController {
  constructor(private readonly myPageService: MyPageService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getMyPage(@GetCurrentUser() user) {
    const profile = await this.myPageService.getProfile(user);
    const followings = await this.myPageService.getFollowingCount(user);
    const followers = await this.myPageService.getFollowerCount(user);
    const reviews = await this.myPageService.getReviewCount(user);

    return { ...profile, followings, followers, reviews };
  }

  @Put()
  @UseGuards(AuthGuard)
  async updateMyPage(@GetCurrentUser() user, @Body() body) {
    return await this.myPageService.updateProfile(user, { ...body });
  }

  @Get('following')
  @UseGuards(AuthGuard)
  async getFollowing(@GetCurrentUser() user) {
    return await this.myPageService.getFollowing(user);
  }

  @Get('follower')
  @UseGuards(AuthGuard)
  async getFollower(@GetCurrentUser() user) {
    return await this.myPageService.getFollower(user);
  }
}
