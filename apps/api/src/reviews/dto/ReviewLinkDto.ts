import { IsNotEmpty, IsString } from 'class-validator';

export class ReviewLinkDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  href: string;
}
