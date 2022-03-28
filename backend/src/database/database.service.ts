import { Injectable } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class DatabaseService {

    addText(textToAdd: string): string {
        console.log("Received! ", textToAdd)

        try {
            let firestore = getFirestore();
            let doc = firestore.collection('testCollection').doc('testDoc');
            doc.set({ text: textToAdd });
            return "Added text";
        } catch {
            return "Failed to add text";
        }

    }
}
