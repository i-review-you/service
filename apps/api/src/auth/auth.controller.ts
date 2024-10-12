import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post()
  async login(
        @Body('email') email,
        @Body('password') password,
  ) {
    return await this.authService.login(email, password);
  }
}
