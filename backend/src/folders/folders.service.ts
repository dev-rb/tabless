import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference, FieldValue } from 'firebase-admin/firestore';

@Injectable()
export class FoldersService {
    constructor(@Inject('users') private usersCollection: CollectionReference) { }

    async getAllFolders(userId: string) {
        const docRef = await this.usersCollection.doc(userId).get();
        return docRef.get('folders');
    }

    async getFolderWithId(folderId: string, userId: string) {
        const docRef = await this.usersCollection.doc(userId).get();
        const allFolders = docRef.get('folders');

        return allFolders.find((val) => val.id === folderId);
    }

    async createFolder(newFolderData, userId: string) {
        const docRef = await this.usersCollection.doc(userId);
        docRef.update({
            folders: FieldValue.arrayUnion(newFolderData)
        });
    }

    async updateFolderName(newFolderName: string, folderId: string, userId: string) {
        const userRef = await this.usersCollection.doc(userId);
        const docRef = await userRef.get();
        let allUserFolders = docRef.get('folders');
        const folderWithId = allUserFolders.findIndex((val) => val.id === folderId);

        if (folderWithId !== -1) {
            const folderData = allUserFolders[folderWithId];
            allUserFolders[folderWithId] = { ...folderData, name: newFolderName };
        }

        userRef.update({
            folders: allUserFolders
        }).catch((err) => console.log("Firebase update failed!"));
    }

    async addDocumentToFolder(documentId: string, folderId: string, userId: string) {
        const userRef = await this.usersCollection.doc(userId);
        const docRef = await userRef.get();
        let allUserFolders = docRef.get('folders');
        const folderWithId = allUserFolders.findIndex((val) => val.id === folderId);

        if (folderWithId !== -1) {
            const folderData = allUserFolders[folderWithId];
            const folderDocs = allUserFolders[folderWithId].documents;
            allUserFolders[folderWithId] = { ...folderData, documents: [...folderDocs, documentId] };
        }

        userRef.update({
            folders: allUserFolders
        }).catch((err) => console.log("Firebase update failed!"));
    }

    async deleteDocumentFromFolder(documentId: string, folderId: string, userId: string) {
        const userRef = await this.usersCollection.doc(userId);
        const docRef = await userRef.get();
        let allUserFolders = docRef.get('folders');
        const folderWithId = allUserFolders.findIndex((val) => val.id === folderId);

        if (folderWithId !== -1) {
            const folderData = allUserFolders[folderWithId];
            let folderDocs = allUserFolders[folderWithId].documents;
            folderDocs = folderDocs.filter((val) => val !== documentId);
            allUserFolders[folderWithId] = { ...folderData, documents: folderDocs };
        }

        userRef.update({
            folders: allUserFolders
        }).catch((err) => console.log("Firebase update failed!"));
    }

    async deleteFolder(folderId: string, userId: string) {
        const userRef = await this.usersCollection.doc(userId);
        const docRef = await userRef.get();
        let allUserFolders = docRef.get('folders');
        allUserFolders = allUserFolders.filter((val) => val.id === folderId);

        userRef.update({
            folders: allUserFolders
        }).catch((err) => console.log("Firebase update failed!"));
    }
}
