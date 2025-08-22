// src/employee-territories/entities/employee-territory.entity.ts
import { Entity, PrimaryColumn,ManyToOne, JoinColumn } from 'typeorm';
import { Territory } from '../../territories/entities/territory.entity';

@Entity({ name: 'employee_territories' })
export class EmployeeTerritory {
  @PrimaryColumn({ name: 'employee_id', type: 'int' })
  employeeId: number;

  @PrimaryColumn({ name: 'territory_id', type: 'varchar', length: 20 })
  territoryId: string;

  // Relaciones:
  @ManyToOne(() => Territory, { eager: false })
  @JoinColumn({ name: 'territory_id' })
  territory: Territory;
}
