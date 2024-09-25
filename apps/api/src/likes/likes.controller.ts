/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @stylistic/brace-style */
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetCurrentUser } from 'src/auth/auth.decorator';
import { Response } from 'express';

@Controller('review-like')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // 좋아요 개수 셀 때는 사용자 인증 필요 x
  @Get(':review_id')
  async getLikeCount(
    @Param('review_id') reviewId: number,
    @Res() res: Response,
  ) {
    try {
      const likeCount = await this.likesService.getLikeCount(reviewId);
      return res.status(HttpStatus.OK).json({
        reviewId,
        likeCount,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to get like count' });
    }
  }

  @Post(':review_id')
  @UseGuards(AuthGuard)
  async toggleLike(
    @GetCurrentUser() user,
    @Param('review_id') reviewId: number,
    @Res() res: Response,
  ) {
    try {
      const isLiked = await this.likesService.toggleLike(user, reviewId);
      return res.status(HttpStatus.OK).json({ isLiked });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to toggle like' });
    }
  }
}
