import { Module } from '@nestjs/common';
import { PlannerModule } from 'src/planner/module/planner.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ENVIRONMENT } from 'src/common/constants/environment/env.variable';
import { JwtAuthGuard } from './guards/jwt.guard';
import { VendorModule } from 'src/vendor/vendor.module';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    PlannerModule,
    VendorModule,
    OtpModule,

    {
      ...JwtModule.register({
        secret: ENVIRONMENT.JWT.SECRET,
        signOptions: { expiresIn: ENVIRONMENT.JWT.EXPIRATION_TIME },
      }),
      global: true,
    },
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
