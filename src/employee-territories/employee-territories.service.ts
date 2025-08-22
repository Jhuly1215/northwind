// src/employee-territories/employee-territories.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeTerritory } from './entities/employee-territory.entity';
import { CreateEmployeeTerritoryDto } from './dto/create-employee-territory.dto';

@Injectable()
export class EmployeeTerritoriesService {
  constructor(
    @InjectRepository(EmployeeTerritory) private repo: Repository<EmployeeTerritory>,
  ) {}

  findAll() { return this.repo.find(); }

  async findOne(employeeId: number, territoryId: string) {
    const et = await this.repo.findOne({ where: { employeeId, territoryId } });
    if (!et) throw new NotFoundException('Link not found');
    return et;
    }

  // Crear vínculo empleado–territorio
  create(dto: CreateEmployeeTerritoryDto) {
    return this.repo.save(this.repo.create(dto));
  }

  // Eliminar vínculo (por PK compuesta)
  async remove(employeeId: number, territoryId: string) {
    await this.findOne(employeeId, territoryId);
    await this.repo.delete({ employeeId, territoryId });
    return { deleted: true };
  }
}
