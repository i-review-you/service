/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/CreateReviewDto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetCurrentUser } from 'src/auth/auth.decorator';
import { Response } from 'express';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getReviews(@GetCurrentUser() user, @Res() res: Response) {
    try {
      const reviews = await this.reviewsService.getReviews(user);
      // return res.status(HttpStatus.OK).json(reviews);
      return res.status(HttpStatus.OK).json({
        userId: user.id,
        reviews,
      });
    }
    catch (error) {
      throw new HttpException(
        'Failed to fetch reviews',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createReview(
    @GetCurrentUser() user,
    @Body() createReviewDto: CreateReviewDto,
    @Res() res: Response,
  ) {
    try {
      const newReview = await this.reviewsService.createReview(
        user,
        createReviewDto,
      );
      return res.status(HttpStatus.CREATED).json(newReview);
    }
    catch (error) {
      throw new HttpException(
        'Failed to create reviews',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':review_id')
  @UseGuards(AuthGuard)
  async updateReview(
    @GetCurrentUser() user,
    @Param('review_id') reviewId: number,
    @Body() CreateReviewDto: CreateReviewDto,
    @Res() res: Response,
  ) {
    try {
      this.reviewsService.updateReview(user, reviewId, CreateReviewDto);
      return res.status(HttpStatus.OK).json({
        message: 'Success to update review',
      });
    }
    catch (error) {
      throw new HttpException('Failed to update eview', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':review_id')
  @UseGuards(AuthGuard)
  async deleteReview(
    @GetCurrentUser() user,
    @Param('review_id') reviewId: number,
    @Res() res: Response,
  ) {
    try {
      this.reviewsService.deleteReview(user, reviewId);
      return res.status(HttpStatus.OK).json({
        message: 'Success to delete review',
      });
    }
    catch (error) {
      throw new HttpException(
        'Failed to delete review',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
