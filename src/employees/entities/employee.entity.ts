// src/employees/entities/employee.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmployeeTerritory } from '../../employee-territories/entities/employee-territory.entity';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn({ name: 'employee_id', type: 'smallint' })
  employeeId: number;

  @Column({ name: 'last_name', type: 'varchar', length: 20 })
  lastName: string;

  @Column({ name: 'first_name', type: 'varchar', length: 10 })
  firstName: string;

  @Column({ name: 'title', type: 'varchar', length: 30, nullable: true })
  title?: string;

  @Column({ name: 'title_of_courtesy', type: 'varchar', length: 25, nullable: true })
  titleOfCourtesy?: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ name: 'hire_date', type: 'date', nullable: true })
  hireDate?: Date;

  @Column({ name: 'address', type: 'varchar', length: 60, nullable: true })
  address?: string;

  @Column({ name: 'city', type: 'varchar', length: 15, nullable: true })
  city?: string;

  @Column({ name: 'region', type: 'varchar', length: 15, nullable: true })
  region?: string;

  @Column({ name: 'postal_code', type: 'varchar', length: 10, nullable: true })
  postalCode?: string;

  @Column({ name: 'country', type: 'varchar', length: 15, nullable: true })
  country?: string;

  @Column({ name: 'home_phone', type: 'varchar', length: 24, nullable: true })
  homePhone?: string;

  @Column({ name: 'extension', type: 'varchar', length: 4, nullable: true })
  extension?: string;

  @Column({ name: 'photo', type: 'blob', nullable: true })
  photo?: Buffer;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  // Auto referenciado
  @Column({ name: 'reports_to', type: 'smallint', nullable: true })
  reportsTo?: number;

  @ManyToOne(() => Employee, (e) => e.subordinates, { nullable: true })
  @JoinColumn({ name: 'reports_to' }) // FK -> employees.employee_id
  manager?: Employee;

  @OneToMany(() => Employee, (e) => e.manager)
  subordinates: Employee[];

  @Column({ name: 'photo_path', type: 'varchar', length: 255, nullable: true })
  photoPath?: string;

  @OneToMany(() => EmployeeTerritory, (et) => et.employeeId) employeeTerritories: EmployeeTerritory[];


}
