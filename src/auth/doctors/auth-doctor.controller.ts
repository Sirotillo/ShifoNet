import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { CreateDoctorDto } from "../../doctors/dto/create-doctor.dto";
import { SignInDto } from "../dto/sign-in.dto";
import { Response } from "express";
import { AuthDoctorService } from "./auth-doctor.service";
import { SignInDtoDoctor } from "../dto/sign-in-doctor.dto";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";

@Controller("auth/doctor")
export class AuthDoctorController {
  constructor(private readonly authService: AuthDoctorService) {}

  @Post("sign-up")
  async signUp(@Body() createDoctorDto: CreateDoctorDto) {
    return this.authService.signUp(createDoctorDto);
  }

  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDtoDoctor,
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
