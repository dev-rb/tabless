import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    async getUserInfo(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            },

        });

        return user;
    }
}
