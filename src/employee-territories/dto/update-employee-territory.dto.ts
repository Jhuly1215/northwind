import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeTerritoryDto } from './create-employee-territory.dto';

export class UpdateEmployeeTerritoryDto extends PartialType(CreateEmployeeTerritoryDto) {}
