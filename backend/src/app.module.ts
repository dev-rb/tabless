import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import serviceAccountKey from './config/serviceAccountKey';
import { FirestoreModule } from './firestore/firestore.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentsModule } from './documents/documents.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local'
    }),
    FirestoreModule.forRoot({
      imports: [],
      useFactoy: () => ({
        projectId: 'tabless-notes',
        credentials: { client_email: serviceAccountKey.client_email, private_key: serviceAccountKey.private_key }
      }),
      inject: []
    }),
    OpenaiModule.forRoot({ apiKey: process.env.OPENAI_API_KEY, isJsonMime: (mime) => false }),
    DocumentsModule,
    SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
