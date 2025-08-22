// src/regions/entities/region.entity.ts
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Territory } from '../../territories/entities/territory.entity';

@Entity({ name: 'region' }) // nombre exacto de la tabla en Northwind
export class Region {
  @PrimaryColumn({ name: 'region_id', type: 'int' })
  regionId: number;

  @Column({ name: 'region_description', type: 'varchar', length: 50 })
  regionDescription: string;

  @OneToMany(() => Territory, (t) => t.region)
  territories: Territory[];
}
