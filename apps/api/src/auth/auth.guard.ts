import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {

  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException();
    }

    const tokenizedToken = token.split(' ');
    if (tokenizedToken[0] !== 'Bearer' || !tokenizedToken[1]) {
      throw new UnauthorizedException();
    }

    const result = await this.authService.getUser(tokenizedToken[1]);
    req.user = result.user;

    return true;
  }
}
