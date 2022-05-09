import { FirebaseError } from "firebase/app";
import { getAuth, signInWithCustomToken, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { nanoid } from "nanoid";

const auth = getAuth();

export const signInWithGoogle = async () => {
    const uuid = nanoid();
    window.openUrl.openUrl(`http://localhost:3001/login?id=${uuid}`);
    const db = getDatabase();
    const dbRef = ref(db, `onetime/${uuid}`);
    onValue(dbRef, async (snap) => {
        const val = snap.val();
        if (val) {
            await signInWithCustomToken(auth, val.token).then((val) => val.user);
        }
    });
}
