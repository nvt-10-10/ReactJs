import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('DATABASE.CONNECT'),
        host: configService.get<string>('DATABASE.HOST'),
        port: configService.get<number>('DATABASE.PORT'),
        username: configService.get<string>('DATABASE.USER'),
        password: configService.get<string>('DATABASE.PASSWORD'),
        database: configService.get<string>('DATABASE.NAME'),
        entities: ['dist/**/**.entity{.ts,.js}'],
        // entities: [configService.get<string>("ROOT_PATH") + "/src/**/*.entity{.ts,.js}"],
        synchronize: configService.get<string>('NODE_ENV') === 'development', // Tạo migration tự động khi khởi chạy ứng dụng
        logging: configService.get<string>('NODE_ENV') === 'development',
        autoLoadEntities: true,
        keepConnectionAlive: true,
        migrationsRun: false,
        migrations: [
          configService.get<string>('ROOT_PATH') +
            '/dist/database/migrations/*{.ts,.js}',
        ],
        migrationsTableName: 'migrations',
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseConfig {}
