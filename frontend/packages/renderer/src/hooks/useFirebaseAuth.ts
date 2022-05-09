import * as React from 'react';
import { signInUser, signOutLocal } from '@/redux/slices/authSlice';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

interface Props {
    successCallback: VoidFunction,
    failureCallback: VoidFunction
}
const auth = getAuth();

export const useFirebaseAuth = ({ successCallback, failureCallback }: Props) => {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [currUser, setCurrUser] = React.useState<User | null>(null);


    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log(user);
                user.getIdToken().then((val) => dispatch(signInUser(val)));
                setIsLoggedIn(true);
                successCallback();

            } else {
                setIsLoggedIn(false);
                failureCallback();
            }
        });

        return () => {
            unsubscribe()
        };
    }, [auth])

    return { isLoggedIn, currUser }

}

function dispatch(arg0: {
    payload: string; type: string; // console.log(user);
}): any {
    throw new Error('Function not implemented.');
}
