import { IsInt, IsString, MaxLength, Min } from 'class-validator';
export class DeleteEmployeeTerritoryDto {
  @IsInt() @Min(1)
  employeeId: number;

  @IsString() @MaxLength(20)
  territoryId: string;
}