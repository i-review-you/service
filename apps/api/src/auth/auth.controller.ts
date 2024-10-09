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

  @Post('signup')
  async signup(
      @Body('email') email: string,
      @Body('password') password: string,
  ) {
    return await this.authService.signup(email, password);
  }

  @Post('confirm')
  async confirm(
      @Body('token') token: string,
  ) {
    return await this.authService.confirm(token);
  }
}
