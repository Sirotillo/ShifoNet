import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class PatientGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException('Token mavjud emas');
      }
  
      const [bearer, token] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Token formati noto‘g‘ri');
      }
  
      let payload: any;
      try {
        payload = this.jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
      } catch (err) {
        throw new UnauthorizedException('Token noto‘g‘ri yoki muddati o‘tgan');
      }
  
      if (payload.type !== 'patient') {
        throw new ForbiddenException('Faqat patient foydalanuvchilar uchun');
      }
  
      req.user = payload;
      return true;
    }
  }
  