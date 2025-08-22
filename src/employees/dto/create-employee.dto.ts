// src/employees/dto/create-employee.dto.ts
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @IsString() @MaxLength(20)
  lastName: string;

  @IsString() @MaxLength(10)
  firstName: string;

  @IsOptional() @IsString() @MaxLength(30)
  title?: string;

  @IsOptional() @IsString() @MaxLength(25)
  titleOfCourtesy?: string;

  @IsOptional() @Type(() => Date) @IsDate()
  birthDate?: Date;

  @IsOptional() @Type(() => Date) @IsDate()
  hireDate?: Date;

  @IsOptional() @IsString() @MaxLength(60)
  address?: string;

  @IsOptional() @IsString() @MaxLength(15)
  city?: string;

  @IsOptional() @IsString() @MaxLength(15)
  region?: string;

  @IsOptional() @IsString() @MaxLength(10)
  postalCode?: string;

  @IsOptional() @IsString() @MaxLength(15)
  country?: string;

  @IsOptional() @IsString() @MaxLength(24)
  homePhone?: string;

  @IsOptional() @IsString() @MaxLength(4)
  extension?: string;

  // photo: se suele subir en endpoint aparte; aquí lo omitimos

  @IsOptional() @IsString()
  notes?: string;

  @IsOptional() @IsInt() @Min(1)
  reportsTo?: number;

  @IsOptional() @IsString() @MaxLength(255)
  photoPath?: string;
}
