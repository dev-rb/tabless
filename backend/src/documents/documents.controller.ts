import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DocumentsService } from './documents.service';

@Controller('documents')
@UseGuards(AuthGuard)
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { };
    /**
     * Get saved documents 
     */
    @Get('/')
    getSavedDocuments(@Request() req) {
        console.log("All documents get called!");
        return this.documentsService.getSavedDocuments(req.userId);
    }

    @Get('/recent')
    getRecentDocuments(@Request() req) {
        return this.documentsService.getRecentDocuments(req.userId);

    }

    @Get(':id')
    getDocumentWithId(@Request() req, @Param('id') id: string) {
        return this.documentsService.getDocumentWithId(id, req.userId);

    }

    @Post('/create')
    createDocument(@Request() req, @Body() documentToCreate) {
        console.log("Create called!")
        return this.documentsService.createDocument(documentToCreate, req.userId)
    }

    @Put('/update/:id')
    updateDocument(@Request() req, @Body() newDocumentData, @Param('id') id: string) {
        console.log("Update controller called!")
        return this.documentsService.updateDocument(newDocumentData, id, req.userId)
    }

    @Delete('/delete/:id')
    deleteDocument(@Request() req, @Param('id') id: string) {
        return this.documentsService.deleteDocument(id, req.userId)
    }

}
