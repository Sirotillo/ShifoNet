import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpCode,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PatientsService } from "../../patients/patients.service";
import { JwtService } from "@nestjs/jwt";
import { Patient } from "../../patients/Models/patient.model";
import { CreatePatientDto } from "../../patients/dto/create-patient.dto";
import { SignInDto } from "../dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AuthPatientService {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(patient: Patient) {
    const payload = {
      id: patient.id,
      phone: patient.phone_number,
      type: "patient",
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

  async signUp(createPatientDto: CreatePatientDto) {
    const candidate = await this.patientsService.findPatientByPhone(
      createPatientDto.phone_number
    );

    if (candidate) {
      throw new ConflictException("Bunday telefon raqamli bemor mavjud");
    }
    const newPatient = await this.patientsService.create(createPatientDto);

    return { message: "Foydalanuvchi qoshildi", patientId: newPatient.id };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const patient = await this.patientsService.findPatientByPhone(
      signInDto.phone_number
    );
    if (!patient) {
      throw new BadRequestException("Email yoki password notog'ri");
    }

    if (!patient.is_active) {
      throw new BadRequestException("Avval email ni tasdiqlang");
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      patient.password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki password notog'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(patient);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    patient.refresh_token = await bcrypt.hash(refreshToken, 7);
    await patient.save();
    return { message: "Tizimga xush kelibsiz", accessToken };
  }

  async refreshToken(patientId: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (patientId !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan");
    }
    const patient = await this.patientsService.findOne(patientId);

    if (!patient || !patient.refresh_token) {
      throw new NotFoundException("user not found");
    }

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      patient.refresh_token
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const { accessToken, refreshToken } = await this.generateTokens(patient);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.patientsService.updateRefreshToken(
      patient.id,
      hashed_refresh_token
    );

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "Patient refreshed",
      patientId: patient.id,
      access_token: accessToken,
    };

    return response;
  }

  async signOut(refreshToken: string, res: Response) {
    const patientData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!patientData) {
      throw new ForbiddenException("User not verifed");
    }
    const refresh_token = null;
    await this.patientsService.updateRefreshToken(
      patientData.id,
      refresh_token!
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",
    };

    return response;
  }
}
