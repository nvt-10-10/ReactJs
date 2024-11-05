import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    // Đánh dấu các route không yêu cầu xác thực
    const exemptedRoutes = ['/public-route', '/another-public-route'];

    if (exemptedRoutes.includes(req.path)) {
      return next();
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
