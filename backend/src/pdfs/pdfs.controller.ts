import { Controller, Delete, Get, Post, Put, UseGuards, Request, Body, Param } from '@nestjs/common';
import { Pdf } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { PdfsService } from './pdfs.service';

@Controller('pdfs')
@UseGuards(AuthGuard)
export class PdfsController {
    constructor(private readonly pdfsService: PdfsService) { };

    @Get('/')
    getAllPdfsForDocument(@Body() docId) {
        return this.pdfsService.getAllPdfsForDocument(docId);
    }

    @Post('/create')
    createPdf(@Body('document') docId: string, @Body('pdf') pdfInfo: Pdf) {
        return this.pdfsService.createPdf(docId, pdfInfo);
    }

    @Put('/update')
    updatePdf(@Body() pdfInfo: Pdf) {
        console.log("Update pdf called! ", pdfInfo);
        return this.pdfsService.updatePdf(pdfInfo);
    }

    @Delete('/delete/:id')
    deletePdf(@Param('id') pdfId: string) {
        return this.pdfsService.deletePdf(pdfId);
    }
}
