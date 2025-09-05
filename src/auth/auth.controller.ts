// src/auth/auth.controller.ts
import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Inicio de sesión exitoso.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.auth.login(req.user);
  }

  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        employeeId: { type: 'integer', example: 1 },
        username: { type: 'string', example: 'usuario123' },
        password: { type: 'string', example: 'miContraseñaSegura' },
      },
      required: ['employeeId', 'username', 'password'],
    },
  })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @Post('register')
  register(
    @Body('employeeId') employeeId: number,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.auth.register(employeeId, username, password);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cambiar contraseña' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: 'Contraseña cambiada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req: any, @Body() dto: ChangePasswordDto) {
    // req.user.userId viene de JwtStrategy.validate()
    return this.auth.changePassword(req.user.userId, dto.currentPassword, dto.newPassword);
  }
}
