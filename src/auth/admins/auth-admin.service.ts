import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpCode,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AdminService } from "../../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "../../admin/Models/admin.model";
import { CreateAdminDto } from "../../admin/dto/create-admin.dto";
import { SignInDto } from "../dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { SignInDtoAdmin } from "../dto/sign-in-admin.dto";

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly adminsService: AdminService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      role: admin.role,
      type: "admin",
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(signInDto: SignInDtoAdmin, res: Response) {
    const admin = await this.adminsService.findAdminByPhone(
      signInDto.phone_number
    );
    if (!admin) {
      throw new BadRequestException("Email yoki password notog'ri");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      admin.password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki password notog'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    admin.refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();
    return { message: "Tizimga xush kelibsiz", accessToken };
  }

  async refreshToken(adminId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (adminId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }
    const admin = await this.adminsService.findOne(adminId);

    if (!admin || !admin.refresh_token) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(refresh_token, admin.refresh_token);

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.adminsService.updateRefreshToken(admin.id, hashed_refresh_token);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "Admin refreshed",
      adminId: admin.id,
      access_token: accessToken,
    };

    return response;
  }

  async signOut(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException("User not verifed");
    }
    const refresh_token = null;
    await this.adminsService.updateRefreshToken(adminData.id, refresh_token!);

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };

    return response;
  }
}
