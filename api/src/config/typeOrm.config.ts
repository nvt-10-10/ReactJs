import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const isDevelopment = process.env.NODE_ENV === 'development';
    return {
      type: process.env.DATABASE_CONNECT as any,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      // entities: ["dist/**/*.entity.{ts,js}"],
      migrations: isDevelopment
        ? ['src/database/migrations/*.{ts,js}']
        : ['dist/database/migrations/*.{ts,js}'],
      // namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
