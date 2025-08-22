// src/territories/dto/create-territory.dto.ts
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateTerritoryDto {
  @IsString() @IsNotEmpty() @MaxLength(20)
  territoryId: string;

  @IsString() @IsNotEmpty() @MaxLength(50)
  territoryDescription: string;

  @IsInt() @Min(1)
  regionId: number;
}

