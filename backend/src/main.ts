import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin'
// import serviceAccount from './config/serviceAccountKey';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: JSON.parse(process.env.FIREBASE_PROJECT_ID),
        clientEmail: JSON.parse(process.env.FIREBASE_CLIENT_EMAIL),
        privateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY),
      }),
    });
  } catch (e) {
    console.log(e)
  }

  await app.listen(process.env.PORT || 3002);
}
bootstrap();
