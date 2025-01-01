import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repositories/users.repository';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './shared/auth.guard';

@Module({
  imports: [
    JwtModule.register({ global: true })],
  controllers: [UsersController, AuthController],
  providers: [
    UsersService, 
    UsersRepository, 
    AuthService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
