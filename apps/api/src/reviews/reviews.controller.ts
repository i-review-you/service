import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { CreateReviewDto } from "./dto/CreateReviewDto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";
import { Response } from "express";
import { GetCurrentUser } from "src/auth/auth.decorator";

// TODO: 상태코드 추가해야 함

@ApiBearerAuth()
@ApiTags("리뷰")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // TODO: 토큰 인증 후 리뷰 조회
  // TODO: 전체 리뷰 조회 시 나와 내가 팔로우 하는 사람이 작성한 공개글을 보여줘야 함
  // TODO: 내 게시글만 보기 선택 가능해야 함
  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "리뷰 목록", description: "리뷰를 가져옵니다." })
  @ApiResponse({ status: 200, description: "리뷰를 가져왔습니다." })
  // @ApiResponse({ status: 401, description: "로그인이 필요합니다." })
  async getReviews() {
    return this.reviewsService.getReviews();
  }

  // TODO: 토큰 인증 후 리뷰 생성
  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "리뷰 생성", description: "리뷰를 생성합니다." })
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  // TODO: 토큰 인증 후 리뷰 수정
  @Put(":review_id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "리뷰 수정", description: "리뷰를 수정합니다." })
  async updateReview(
    @Param("review_id") reviewId: number,
    @Body() CreateReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.updateReview(reviewId, CreateReviewDto);
  }

  // TODO: 토큰 인증 후 리뷰 삭제
  @Delete(":review_id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "리뷰 삭제", description: "리뷰를 삭제합니다." })
  async deleteReview(@Param("review_id") reviewId: number) {
    return this.reviewsService.deleteReview(reviewId);
  }
}
