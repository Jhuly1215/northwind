// src/employees/employees.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';



@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee) private repo: Repository<Employee>,
  ) {}

  findAll() {
    // Para traer también jefe y conteo de subordinados:
    return this.repo.find({
      relations: { manager: true },
      order: { employeeId: 'ASC' },
    });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({
      where: { employeeId: id },
      relations: { manager: true, subordinates: true },
    });
    if (!e) throw new NotFoundException('Employee not found');
    return e;
  }

  async create(dto: CreateEmployeeDto) {
    // Regla: no puede reportar a sí mismo
    if (dto.reportsTo && Number(dto.reportsTo) === Number((dto as any).employeeId)) {
      throw new BadRequestException('An employee cannot report to themselves');
    }
    // Si se especifica manager, verificar que exista
    if (dto.reportsTo) {
      const manager = await this.repo.findOne({
        where: { employeeId: dto.reportsTo },
      });
      if (!manager) {
        throw new BadRequestException('Manager (reports_to) does not exist');
      }
    }
    const entity = this.repo.create(dto as any);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    const current = await this.findOne(id);

    if (dto.reportsTo) {
      if (Number(dto.reportsTo) === id) {
        throw new BadRequestException('An employee cannot report to themselves');
      }
      const manager = await this.repo.findOne({
        where: { employeeId: dto.reportsTo },
      });
      if (!manager) {
        throw new BadRequestException('Manager (reports_to) does not exist');
      }
    }

    await this.repo.update({ employeeId: id }, dto as any);
    return this.findOne(id);
  }

  async remove(id: number) {
    // Regla: no borrar si tiene subordinados
    const subs = await this.repo.count({ where: { reportsTo: id } });
    if (subs > 0) {
      throw new BadRequestException(
        `Cannot delete employee ${id} because they have ${subs} subordinate(s). Reassign or delete subordinates first.`,
      );
    }
    // (opcional) si hay referencias en otras tablas, manejar FK/ON DELETE
    await this.repo.delete({ employeeId: id });
    return { deleted: true };
  }
  
}
