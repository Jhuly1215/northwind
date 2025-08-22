// src/regions/regions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region) private repo: Repository<Region>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const region = await this.repo.findOne({ where: { regionId: id } });
    if (!region) throw new NotFoundException('Region not found');
    return region;
  }

  async create(dto: CreateRegionDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateRegionDto) {
    await this.findOne(id);
    await this.repo.update({ regionId: id }, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.delete({ regionId: id });
    return { deleted: true };
  }
}
