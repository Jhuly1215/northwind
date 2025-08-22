// src/employee-credentials/dto/create-employee-credential.dto.ts
import { IsInt, Min, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeCredentialDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  employeeId: number;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9._]+$/, {
    message: 'username solo puede contener letras, números, punto y guion bajo',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(200)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'password debe incluir mayúscula, minúscula y dígito',
  })
  password: string;
}
