import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { AuthAdminService } from "./auth-admin.service";
import { CreateAdminDto } from "../../admin/dto/create-admin.dto";
import { SignInDto } from "../dto/sign-in.dto";
import { Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";

@Controller("auth/admin")
export class AuthAdminController {
  constructor(private readonly authService: AuthAdminService) {}
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
