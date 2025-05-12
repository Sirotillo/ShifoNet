import { Module } from "@nestjs/common";
import { StaffService } from "./staff.service";
import { StaffController } from "./staff.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Staff } from "./Models/staff.model";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    SequelizeModule.forFeature([Staff]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>("ACCESS_TOKEN_KEY"),
        signOptions: { expiresIn: config.get<string>("ACCESS_TOKEN_TIME") },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [StaffController],
  providers: [StaffService],
  exports: [StaffService],
})
export class StaffModule {}
