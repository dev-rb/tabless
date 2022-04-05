import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {

    constructor(private readonly api: ApiService) { }

    @Get('/')
    getHello() {
        return "Hello World";
    }

    @Get('/generate/keywords')
    async generateKeywords(@Body('text') textToCheck: string): Promise<string[]> {
        return await this.api.generateKeywords(textToCheck);
    }
}
