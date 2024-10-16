import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsIn,
  Max,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ReviewLinkDto } from './ReviewLinkDto';
import { ReviewTagDto } from './ReviewTagDto';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsIn(['private', 'followers'])
  visibility: 'private' | 'followers';

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReviewLinkDto)
  links?: ReviewLinkDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReviewTagDto)
  tags?: ReviewTagDto[];
}
