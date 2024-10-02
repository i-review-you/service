/* eslint-disable @stylistic/brace-style */
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
  Query,
  NotFoundException,
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
  async getReviewsByCategory(
    @Res() response: Response,
    @GetCurrentUser() user,
    @Query('category_id') categoryId: number, // Query로 카테고리 ID를 받음
  ) {
    try {
      const reviews = await this.reviewsService.getReviewsByCategory(
        user,
        categoryId,
      );

      if (!reviews || reviews.length === 0) {
        throw new NotFoundException('No reviews found for this category');
      }

      return response.status(200).json({
        message: 'Reviews fetched successfully',
        reviews,
      });
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch reviews', error: error.message });
    }
  }

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
    } catch (error) {
      throw new HttpException(
        'Failed to fetch reviews',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':review_id')
  @UseGuards(AuthGuard)
  async getReviewDetail(
    @GetCurrentUser() user,
    @Param('review_id') reviewId: number,
    @Res() res: Response,
  ) {
    try {
      const reviewDetail = await this.reviewsService.getReviewDetail(
        user,
        reviewId,
      );
      if (!reviewDetail) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Review not found' });
      }
      return res.status(HttpStatus.OK).json(reviewDetail);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to fetch review detail' });
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      throw new HttpException(
        'Failed to delete review',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
