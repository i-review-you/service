import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsIn,
  Max,
  Min,
  IsUUID,
} from "class-validator";

export class CreateReviewDto {
  @ApiProperty({
    default: 1,
    description: "카테고리 id",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @ApiProperty({
    example: "your-user-id",
    description: "사용자 id",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @ApiProperty({
    default: "title 1",
    description: "리뷰 제목",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    default: "content 1",
    description: "리뷰 내용",
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    default: 5,
    description: "리뷰 평점",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    default: "private",
    description: "리뷰 공개 여부",
    required: true,
  })
  @IsNotEmpty()
  @IsIn(["private", "followers"])
  visibility: "private" | "followers";
}
