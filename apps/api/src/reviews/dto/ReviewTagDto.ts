import { IsNotEmpty, IsString } from 'class-validator';

export class ReviewTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
