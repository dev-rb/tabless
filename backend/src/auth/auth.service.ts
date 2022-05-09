import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async createUser(email: string | null, name: string | null, userToken: string) {

        try {
            const userId = (await admin.auth().verifyIdToken(userToken)).uid;
            const doesUserExist = await this.prisma.user.findUnique({
                where: {
                    id: userId
                },
            }).then((val) => Boolean(val));
            console.log("Does user exist: ", doesUserExist);
            if (doesUserExist) {
                return;
            } else {
                await this.prisma.user.create({
                    data: {
                        id: userId,
                        name: name,
                        email: email,
                    }
                })
            }
        } catch {
            return 400;
        }


    }
}
