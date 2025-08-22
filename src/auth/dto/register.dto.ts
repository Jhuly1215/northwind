// src/auth/dto/register.dto.ts
import { IsInt, Min, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  employeeId: number;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  // opcional: solo letras, números, punto y guion bajo
  @Matches(/^[a-zA-Z0-9._]+$/, {
    message: 'username solo puede contener letras, números, punto y guion bajo',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  // opcional: al menos 1 mayúscula, 1 minúscula y 1 dígito
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'password debe incluir mayúscula, minúscula y dígito',
  })
  password: string;
}
