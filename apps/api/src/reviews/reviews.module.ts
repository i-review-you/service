import { Module } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { ReviewsController } from "./reviews.controller";
import { AuthService } from "src/auth/auth.service";

@Module({
  controllers: [ReviewsController],
  providers: [AuthService, ReviewsService],
})
export class ReviewsModule {}
