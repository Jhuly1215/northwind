// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCredential } from '../employee-credentials/entities/employee-credential.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmployeeCredential)
    private readonly credRepo: Repository<EmployeeCredential>,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const cred = await this.credRepo
      .createQueryBuilder('cred')
      .addSelect('cred.passwordHash')
      .where('cred.username = :u', { u: username })
      .getOne();

    if (!cred) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(password, cred.passwordHash);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return { employeeId: cred.employeeId, username: cred.username };
  }

  async login(user: { employeeId: number; username: string }) {
    const payload = { sub: user.employeeId, username: user.username };
    return { access_token: await this.jwt.signAsync(payload) };
  }

  async register(employeeId: number, username: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const cred = this.credRepo.create({
      employeeId,
      username,
      passwordHash: hash,
    });
    return this.credRepo.save(cred);
  }

  async changePassword(employeeId: number, currentPassword: string, newPassword: string) {
    const cred = await this.credRepo
      .createQueryBuilder('cred')
      .addSelect('cred.passwordHash') // porque tiene select:false
      .where('cred.employeeId = :id', { id: employeeId })
      .getOne();

    if (!cred) throw new NotFoundException('Credenciales no encontradas');

    const ok = await bcrypt.compare(currentPassword, cred.passwordHash);
    if (!ok) throw new UnauthorizedException('La contraseña actual es incorrecta');

    const isSame = await bcrypt.compare(newPassword, cred.passwordHash);
    if (isSame) throw new BadRequestException('La nueva contraseña no puede ser igual a la actual');

    const newHash = await bcrypt.hash(newPassword, 10);
    await this.credRepo.update({ employeeId }, { passwordHash: newHash });

    return { message: 'Password updated successfully' };
  }
}
