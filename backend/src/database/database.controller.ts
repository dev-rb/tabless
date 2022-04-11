import { Body, Controller, Get, Post } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {

    constructor(private readonly dbService: DatabaseService) { };

    @Post('/text/add')
    addText(@Body('text') textToAdd: string): string {
        return this.dbService.addText(textToAdd)
    }

    /**
     * Get saved documents 
     */
    @Get('/saved/docs')
    getSavedDocuments() {

    }

    /**
     * Save document
     */
    @Post('/save/doc')
    saveDoc() {

    }

}
