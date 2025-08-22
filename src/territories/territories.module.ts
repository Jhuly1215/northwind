// src/territories/territories.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerritoriesController } from './territories.controller';
import { TerritoriesService } from './territories.service';
import { Territory } from './entities/territory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Territory])],
  controllers: [TerritoriesController],
  providers: [TerritoriesService],
})
export class TerritoriesModule {}
