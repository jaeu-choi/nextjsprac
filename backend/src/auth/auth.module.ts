import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'dev-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
    CoursesModule,
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
