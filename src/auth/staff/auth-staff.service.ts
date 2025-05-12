import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpCode,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { StaffService } from "../../staff/staff.service";
import { JwtService } from "@nestjs/jwt";
import { Staff } from "../../staff/Models/staff.model";
import { CreateStaffDto } from "../../staff/dto/create-staff.dto";
import { SignInDto } from "../dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { SignInDtoStaff } from "../dto/sign-in.dto-staff";

@Injectable()
export class AuthStaffService {
  constructor(
    private readonly staffsService: StaffService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(staff: Staff) {
    const payload = {
      id: staff.id,
      phone: staff.phone_number,
      type: "staff",
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

  async signIn(signInDto: SignInDtoStaff, res: Response) {
    const staff = await this.staffsService.findStaffByPhone(
      signInDto.phone_number
    );
    if (!staff) {
      throw new BadRequestException("Email yoki password nnotog'ri");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      staff.password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki password nootog'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(staff);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    staff.refresh_token = await bcrypt.hash(refreshToken, 7);
    await staff.save();
    return { message: "Tizimga xush kelibsiz", accessToken };
  }

  async refreshToken(staffId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (staffId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }
    const staff = await this.staffsService.findOne(staffId);

    if (!staff || !staff.refresh_token) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      staff.refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(staff);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.staffsService.updateRefreshToken(
      staff.id,
      hashed_refresh_token
    );

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "Staff refreshed",
      staffId: staff.id,
      access_token: accessToken,
    };

    return response;
  }

  async signOut(refreshToken: string, res: Response) {
    const staffData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!staffData) {
      throw new ForbiddenException("User not verifed");
    }
    const refresh_token = null;
    await this.staffsService.updateRefreshToken(
      staffData.id,
      refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };

    return response;
  }
}
