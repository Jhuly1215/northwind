// src/employee-credentials/entities/employee-credential.entity.ts
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

@Entity({ name: 'employee_credentials' })
export class EmployeeCredential {
  @PrimaryColumn({ name: 'employee_id', type: 'smallint' })
  employeeId: number;

  @Column({ name: 'username', type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 200, select: false })
  passwordHash: string;

  @OneToOne(() => Employee, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
