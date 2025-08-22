// src/territories/entities/territory.entity.ts
import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Region } from '../../regions/entities/region.entity';

@Entity({ name: 'territories' })
export class Territory {
  // En Northwind territory_id suele ser CHAR/VARCHAR (p.ej. '02116')
  @PrimaryColumn({ name: 'territory_id', type: 'varchar', length: 20 })
  territoryId: string;

  @Column({ name: 'territory_description', type: 'varchar', length: 50 })
  territoryDescription: string;

  @Column({ name: 'region_id', type: 'int' })
  regionId: number;

  @ManyToOne(() => Region, (r) => r.territories, { eager: false })
  @JoinColumn({ name: 'region_id' })
  region: Region;
}
