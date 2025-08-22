// src/employee-territories/dto/create-employee-territory.dto.ts
import { IsInt, IsString, MaxLength, Min } from 'class-validator';

export class CreateEmployeeTerritoryDto {
  @IsInt() @Min(1)
  employeeId: number;

  @IsString() @MaxLength(20)
  territoryId: string;
}