import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentsService {

    constructor(private prisma: PrismaService) { }

    async getSavedDocuments(userId: string) {
        const documents = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                textDoc: {
                    include: {
                        pdfs: true,
                        tags: true
                    }
                }
            }
        });
        return documents.textDoc;
    }

    async getRecentDocuments(userId: string) {
        return this.prisma.textDoc.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                tags: true,
                pdfs: true
            }
        })
    }
    async getDocumentWithId(docId: string, userId: string) {
        return this.prisma.textDoc.findUnique({
            where: {
                id: docId
            },
            include: {
                pdfs: true
            }
        })

    }
    async createDocument(newDoc, userId: string) {
        return this.prisma.textDoc.create({
            data: {
                text: newDoc.text,
                title: newDoc.title,
                author: {
                    connectOrCreate: {
                        create: {
                            id: userId,
                            name: newDoc.author
                        },
                        where: {
                            id: userId
                        }
                    }
                },

            },
            include: {
                tags: true,
                pdfs: true
            }
        });
    }
    async updateDocument(newDocumentData, docId: string, userId: string) {
        return this.prisma.textDoc.update({
            where: {
                id: docId
            },
            data: {
                text: newDocumentData.text
            },
            include: {
                pdfs: true
            }
        })
    }
    async deleteDocument(docId: string, userId: string) {
        return this.prisma.textDoc.delete({
            where: {
                id: docId
            }
        })
    }
}
