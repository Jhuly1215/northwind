// src/territories/territories.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Territory } from './entities/territory.entity';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';

@Injectable()
export class TerritoriesService {
  constructor(@InjectRepository(Territory) private repo: Repository<Territory>) {}

  findAll() { return this.repo.find(); }

  async findOne(id: string) {
    const t = await this.repo.findOne({ where: { territoryId: id } });
    if (!t) throw new NotFoundException('Territory not found');
    return t;
  }

  create(dto: CreateTerritoryDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: string, dto: UpdateTerritoryDto) {
    await this.findOne(id);
    await this.repo.update({ territoryId: id }, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repo.delete({ territoryId: id });
    return { deleted: true };
  }
}
