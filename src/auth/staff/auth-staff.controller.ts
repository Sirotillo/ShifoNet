import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { AuthStaffService } from "./auth-staff.service";
import { SignInDtoStaff } from "../dto/sign-in.dto-staff";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";

@Controller("auth/staff")
export class AuthStaffController {
  constructor(private readonly authService: AuthStaffService) {}

  @Post("sign-in")
  async signIn(
    @Body() signInDtoStaff: SignInDtoStaff,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInDtoStaff, res);
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
