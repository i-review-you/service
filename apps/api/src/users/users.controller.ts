import {
  Controller,
  UseGuards,
  Get,
  Put,
  Param,
} from '@nestjs/common';

import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import { GetCurrentUser } from '../auth/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  @UseGuards(AuthGuard)
  async getList(@GetCurrentUser() user, @Param('username') username: string) {
    return await this.usersService.getUserByUsername(user, username);
  }

  @Put(':username/follow')
  @UseGuards(AuthGuard)
  async follow(@GetCurrentUser() user, @Param('username') username: string) {
    return await this.usersService.follow(user, username);
  }

  @Put(':username/unfollow')
  @UseGuards(AuthGuard)
  async unfollow(@GetCurrentUser() user, @Param('username') username: string) {
    return await this.usersService.unfollow(user, username);
  }
}

@Controller('me')
export class MeController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  async me(@GetCurrentUser() user) {
    return await this.usersService.me(user);
  }
}
