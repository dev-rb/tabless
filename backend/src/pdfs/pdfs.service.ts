import { Injectable } from '@nestjs/common';
import { Pdf } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PdfsService {
    constructor(private prisma: PrismaService) { }

    async getAllPdfsForDocument(docId: string) {
        const pdfs = await this.prisma.pdf.findMany({
            where: {
                textDocId: docId
            }
        });
        return pdfs;
    }

    async createPdf(docId: string, pdfInfo: Pdf) {
        return await this.prisma.pdf.create({
            data: {
                id: pdfInfo.id,
                location: pdfInfo.location,
                name: pdfInfo.name,
                textDoc: {
                    connect: {
                        id: docId
                    }
                }
            }
        })
    }

    async updatePdf(newPdfInfo: Pdf) {
        return this.prisma.pdf.update({
            data: newPdfInfo,
            where: {
                id: newPdfInfo.id
            }
        })
    }

    async deletePdf(pdfId: string) {
        return this.prisma.pdf.delete({
            where: {
                id: pdfId
            }
        })
    }
}
