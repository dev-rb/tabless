import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference, FieldValue, Firestore } from 'firebase-admin/firestore';

@Injectable()
export class DocumentsService {

    constructor(@Inject('users') private usersCollection: CollectionReference) { }

    async getSavedDocuments(userId: string) {
        const docRef = await this.usersCollection.doc(userId).get();
        return docRef.get('documents');
    }

    async getRecentDocuments(userId: string) {
        const docRef = await this.usersCollection.doc(userId).get();
        return docRef.get('documents');
    }
    async getDocumentWithId(docId: string, userId: string) {
        const docRef = await this.usersCollection.doc(userId).get();
        const allUserDocuments = docRef.get('documents');

        return allUserDocuments.find((val) => val.id === docId);

    }
    async createDocument(newDoc, userId: string) {
        const docRef = await this.usersCollection.doc(userId);
        docRef.update({
            documents: FieldValue.arrayUnion(newDoc)
        });
    }
    async updateDocument(newDocumentData, docId: string, userId: string) {
        const userRef = this.usersCollection.doc(userId);
        const docRef = await userRef.get();
        let allUserDocuments = docRef.get('documents');
        const documentWithId = allUserDocuments.findIndex((val) => val.id === docId);

        if (documentWithId !== -1) {
            allUserDocuments[documentWithId] = { ...newDocumentData };
        }

        userRef.update({
            documents: allUserDocuments
        }).catch((err) => console.log("Firebase update failed!"));
    }
    async deleteDocument(docId: string, userId: string) {
        const userRef = this.usersCollection.doc(userId);
        const docRef = await userRef.get();
        let allUserDocuments = docRef.get('documents');
        allUserDocuments = allUserDocuments.filter((val) => val.id !== docId);

        userRef.update({
            documents: allUserDocuments
        });
    }
}
