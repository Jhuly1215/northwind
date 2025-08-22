// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Region } from './regions/entities/region.entity';
import { Territory } from './territories/entities/territory.entity';
import { EmployeeTerritory } from './employee-territories/entities/employee-territory.entity';

import { RegionsModule } from './regions/regions.module';
import { TerritoriesModule } from './territories/territories.module';
import { EmployeeTerritoriesModule } from './employee-territories/employee-territories.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeCredentialsModule } from './employee-credentials/employee-credentials.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'mysql',
        host: cfg.get<string>('DB_HOST'),
        port: cfg.get<number>('DB_PORT'),
        username: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASS'),
        database: cfg.get<string>('DB_NAME'),
        synchronize: false,
        entities: [Region, Territory, EmployeeTerritory],
        logging: true, // habilitarlo para ver SQL en consola
        autoLoadEntities: true,
      }),
    }),

    RegionsModule,
    TerritoriesModule,
    EmployeeTerritoriesModule,
    EmployeesModule,
    AuthModule,
    EmployeeCredentialsModule,
  ],
})
export class AppModule {}
