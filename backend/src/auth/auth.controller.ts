import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { };

    @Post('/create')
    async createUser(@Body() body) {
        try {
            await this.authService.createUser(body.email, body.name, body.token);
        } catch (e) {
            console.log(e);
            return;
        }
    }
}
