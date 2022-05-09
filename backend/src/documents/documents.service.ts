import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentsService {

    constructor(private prisma: PrismaService) { }

    async getSavedDocuments(userId: string) {
        const documents = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        }).textDoc();
        return documents;
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

        const res = await this.prisma.textDoc.findUnique({
            where: {
                id: docId
            },
            include: {
                pdfs: true,
                tags: true,
                author: true
            }
        });
        return { ...res, author: res.author.name }

    }
    async createDocument(newDoc, userId: string) {
        console.log("New Doc ", newDoc, userId)
        return this.prisma.textDoc.create({
            data: {
                title: newDoc.title,
                author: {
                    connect: {
                        id: userId
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
