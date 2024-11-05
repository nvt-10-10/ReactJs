import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { User } from 'src/entities';
import { PassportModule } from '@nestjs/passport';
import { CacheService } from 'src/core/cache/cache.service';
import { JwtStrategy } from './JwtStrategy';
import { UserService } from '../users/services/user.service';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT.SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT.EXPIRE') },
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT.REFRESH_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT.REFRESH_EXPIRE'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, CacheService, JwtStrategy, UserService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
