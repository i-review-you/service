import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { LikesModule } from './likes/likes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ReviewsModule, AuthModule, CategoriesModule, LikesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
