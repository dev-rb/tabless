import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin'
import serviceAccount from './config/serviceAccountKey';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
      }),
      databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
    });
  } catch (e) {
    console.log(e)
  }

  await app.listen(3000);
}
bootstrap();
