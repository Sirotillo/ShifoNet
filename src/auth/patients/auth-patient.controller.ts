import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { CreatePatientDto } from "../../patients/dto/create-patient.dto";
import { SignInDto } from "../dto/sign-in.dto";
import { Response } from "express";
import { AuthPatientService } from "./auth-patient.service";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";

@Controller("auth/patient")
export class AuthPatientController {
  constructor(private readonly authService: AuthPatientService) {}

  @Post("sign-up")
  async signUp(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.signUp(createPatientDto);
  }

  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }

  @Post("logout")
  signout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }
}
