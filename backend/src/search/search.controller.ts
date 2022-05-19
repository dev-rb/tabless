import { Body, Controller, Post } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Post('/process')
    async processText(@Body('text') textToCheck) {
        console.log("Got text! ", textToCheck)
        return await this.searchService.processText(textToCheck);
    }
}
