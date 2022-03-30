import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import serviceAccountKey from './config/serviceAccountKey';
import { DatabaseController } from './database/database.controller';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { FirestoreModule } from './firestore/firestore.module';
import { OpenaiModule } from './openai/openai.module';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';

@Module({
  imports: [DatabaseModule,
    FirestoreModule.forRoot({
      imports: [],
      useFactoy: () => ({
        credentials: { client_email: serviceAccountKey.client_email, private_key: serviceAccountKey.private_key }
      }),
      inject: []
    }),
    OpenaiModule.forRoot({ apiKey: process.env.OPENAI_API_KEY, isJsonMime: (mime) => false }),
    ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
