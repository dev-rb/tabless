import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoldersService {
    constructor(@Inject('users') private prisma: PrismaService) { }

    async getAllFolders(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                folders: {
                    include: {
                    }
                }
            },
        })
        return user.folders;
    }

    async getFolderWithId(folderId: string, userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                folders: {
                    where: {
                        id: folderId,
                    },
                    include: {
                    }
                }
            },
        })

        return user.folders.find((val) => val.id === folderId);
    }

    async createFolder(newFolderData, userId: string) {
        return this.prisma.folder.create({
            data: {
                name: newFolderData.name,
                user: {
                    connect: {
                        id: userId
                    }
                }
            },
        })
    }

    async updateFolderName(newFolderName: string, folderId: string, userId: string) {
        return this.prisma.folder.update({
            where: {
                id: folderId,
            },
            data: {
                name: newFolderName,
            }
        });
    }

    async addDocumentToFolder(documentId: string, folderId: string, userId: string) {
        return this.prisma.folder.update({
            where: {
                id: folderId
            },
            data: {
                textDoc: {
                    connect: {
                        id: documentId
                    }
                }
            }
        })
    }

    async deleteDocumentFromFolder(documentId: string, folderId: string, userId: string) {
        return this.prisma.folder.update({
            where: {
                id: folderId
            },
            data: {
                textDoc: {
                    disconnect: {
                        id: documentId
                    }
                }
            }
        })
    }

    async deleteFolder(folderId: string, userId: string) {
        return this.prisma.folder.delete({
            where: {
                id: folderId,
            }
        })
    }
}
