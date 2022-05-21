import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return validateRequest(request);
    }
}

async function validateRequest(request) {
    const headers = request.headers;

    try {
        const res = await admin.auth().verifyIdToken(headers['authorization']);
        request.userId = res.uid;
    } catch (err) {
        // console.log(err);
        return false;
    }

    return true;
}