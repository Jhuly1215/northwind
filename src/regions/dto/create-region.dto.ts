// src/regions/dto/create-region.dto.ts
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateRegionDto {
  @IsInt() @Min(1)
  regionId: number;

  @IsString() @IsNotEmpty() @MaxLength(50)
  regionDescription: string;
}


