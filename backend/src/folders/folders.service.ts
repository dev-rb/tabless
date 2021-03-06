import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoldersService {
    constructor(private prisma: PrismaService) { }

    async getAllFolders(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                folders: {
                    include: {
                        textDoc: true
                    }
                }
            },
        })
        return user.folders.map((folder) => {
            Object.defineProperty(folder, 'documents', Object.getOwnPropertyDescriptor(folder, 'textDoc'));
            delete folder['textDoc'];
            return folder;
        });
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
                        textDoc: true
                    }
                }
            },
        })
        let folder = user.folders.find((val) => val.id === folderId);
        folder = Object.defineProperty(folder, 'documents', Object.getOwnPropertyDescriptor(folder, 'textDoc'));
        delete folder['textDoc'];
        return folder;
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

    async favoriteFolder(folderId: string) {
        return this.prisma.folder.update({
            data: {
                favorite: {
                    set: true
                },
            },
            where: {
                id: folderId
            }
        });
    }

    async unFavoriteFolder(folderId: string) {
        return this.prisma.folder.update({
            data: {
                favorite: {
                    set: false
                },
            },
            where: {
                id: folderId
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
