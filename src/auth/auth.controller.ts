// src/auth/auth.controller.ts
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.auth.login(req.user);
  }

  @Post('register')
  register(
    @Body('employeeId') employeeId: number,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.auth.register(employeeId, username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req: any, @Body() dto: ChangePasswordDto) {
    // req.user.userId viene de JwtStrategy.validate()
    return this.auth.changePassword(req.user.userId, dto.currentPassword, dto.newPassword);
  }
}
