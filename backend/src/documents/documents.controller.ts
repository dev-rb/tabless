import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
    async getSavedDocuments(@Request() req) {
        console.log("All documents get called!");
        try {
            console.log(req.userId)
            const docs = await this.documentsService.getSavedDocuments(req.userId);
            return docs;
        } catch (e) {
            console.log(e);
            return;
        }
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
    async createDocument(@Request() req, @Body() documentToCreate) {
        console.log("Create called!")
        try {

            return await this.documentsService.createDocument(documentToCreate, req.userId);
        } catch (e) {
            console.log("Failed! ", e);
            return "Failed";
        }
    }

    @Put('/update/:id')
    updateDocument(@Request() req, @Body() newDocumentData, @Param('id') id: string) {
        console.log("Update controller called!")
        return this.documentsService.updateDocument(newDocumentData, id, req.userId)
    }

    @Post('/add/:id/pdf')
    addPdf(@Body() pdfInfo, @Param('id') id: string) {
        return this.documentsService.addPdf(pdfInfo, id);
    }

    @Delete('/delete/:id')
    deleteDocument(@Request() req, @Param('id') id: string) {
        return this.documentsService.deleteDocument(id, req.userId)
    }

}
