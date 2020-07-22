import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('signUp')
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }
}
