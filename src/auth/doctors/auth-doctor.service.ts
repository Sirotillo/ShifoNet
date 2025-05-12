import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpCode,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DoctorsService } from "../../doctors/doctors.service";
import { JwtService } from "@nestjs/jwt";
import { Doctor } from "../../doctors/Models/doctor.model";
import { CreateDoctorDto } from "../../doctors/dto/create-doctor.dto";
import { SignInDto } from "../dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AuthDoctorService {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      phone: doctor.phone_number,
      type: "doctor",
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

  async signUp(createDoctorDto: CreateDoctorDto) {
    const candidate = await this.doctorsService.findDoctorByPhone(
      createDoctorDto.phone_number
    );

    if (candidate) {
      throw new ConflictException("Bunday telefon raqamli bemor mavjud");
    }
    const newDoctor = await this.doctorsService.create(createDoctorDto);

    return { message: "Foydalanuvchi qoshildi", doctorId: newDoctor.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const doctor = await this.doctorsService.findDoctorByPhone(
      signInDto.phone_number
    );
    if (!doctor) {
      throw new BadRequestException("Email yoki password notog'ri");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      doctor.password
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki password notog'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(doctor);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    doctor.refresh_token = await bcrypt.hash(refreshToken, 7);
    await doctor.save();
    return { message: "Tizimga xush kelibsiz", accessToken };
  }

  async refreshToken(doctorId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (doctorId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }
    const doctor = await this.doctorsService.findOne(doctorId);

    if (!doctor || !doctor.refresh_token) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      doctor.refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(doctor);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.doctorsService.updateRefreshTokenDoctor(
      doctor.id,
      hashed_refresh_token
    );

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "Doctor refreshed",
      doctorId: doctor.id,
      access_token: accessToken,
    };

    return response;
  }

  async signOut(refreshToken: string, res: Response) {
    const doctorData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!doctorData) {
      throw new ForbiddenException("User not verifed");
    }
    const refresh_token = null;
    await this.doctorsService.updateRefreshTokenDoctor(
      doctorData.id,
      refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };

    return response;
  }
}
