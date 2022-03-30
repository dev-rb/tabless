import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Module({})
export class OpenaiModule {

    static forRoot(config: Configuration): DynamicModule {

        const openai = new OpenAIApi(config);

        const openaiProvider: Provider = {
            provide: 'OPENAI_CLIENT',
            useValue: openai
        }

        return {
            module: OpenaiModule,
            providers: [openaiProvider],
            exports: [openaiProvider],
            global: true
        }
    }

}
