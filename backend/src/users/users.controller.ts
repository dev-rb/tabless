import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {

    constructor(private readonly usersService: UsersService) { };

    @Get('/')
    getUserInfo(@Request() req) {
        return this.usersService.getUserInfo(req.userId);
    }
}
