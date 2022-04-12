import * as React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai'
import { Anchor, Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { FirebaseError, initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, getDatabase, onValue } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { signInUser, signOutLocal } from '@/redux/slices/authSlice';

declare global {
    interface Window {
        openUrl: any
    }
}

const schema = z.object({
    email: z.string().email({ message: 'Invalid Email' }),
    password: z.string().nonempty({ message: 'Password cannot be empty' })
})

const firebaseConfig = {
    apiKey: "AIzaSyBeUk01P9gT8SRl3SVMqKJBln1x_iIBk0E",
    authDomain: "tabless-notes.firebaseapp.com",
    projectId: "tabless-notes",
    storageBucket: "tabless-notes.appspot.com",
    messagingSenderId: "685635914796",
    appId: "1:685635914796:web:482972591bbdbe2af09589"
};

const app = initializeApp(firebaseConfig);

interface LocationState {
    from: string
}

const SignupPage = () => {
    const auth = getAuth();

    const form = useForm({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        schema: zodResolver(schema)
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const signUpWithGoogle = async () => {
        const uuid = nanoid();
        window.openUrl.openUrl(`http://localhost:3001/login?id=${uuid}`);
        const db = getDatabase();
        const dbRef = ref(db, `onetime/${uuid}`);
        onValue(dbRef, async (snap) => {
            const val = snap.val();
            if (val) {
                await signInWithCustomToken(auth, val.token);
            }
        });
    }

    const signUpWithEmail = async ({ email, password }: typeof form.values) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            const error = err as FirebaseError;
            if (error.code === 'auth/email-already-in-use') {
                form.setErrors({ email: 'This email is already in use!' })
            }
        }
    }

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log(user);
                user.getIdToken().then((val) => dispatch(signInUser(val)));
                navigate((location.state as LocationState).from, { replace: true });
            } else {
                dispatch(signOutLocal())
            }
        });

        return () => {
            unsubscribe()
        };
    }, [auth])


    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className="flex flex-col gap-4 max-w-xs w-full">
                <form className="flex flex-col gap-4" onSubmit={form.onSubmit(signUpWithEmail)}>
                    <h1 className="text-white font-medium text-4xl uppercase">Sign Up</h1>
                    <div className="flex flex-col gap-4">
                        <TextInput
                            label='Username'
                            placeholder='Enter a username'
                            variant='filled'
                            size='md'
                            required
                            styles={{
                                input: {
                                    background: 'transparent', border: '1px solid #606064', color: 'white', "::placeholder": { color: '#444448' },
                                    ":focus-within": { border: '1px solid #3071E8' },
                                    ":focus": { borderColor: '#3071E8 !important' }
                                },
                                label: { color: '#A2A2A3', fontWeight: 400 },
                            }}
                            {...form.getInputProps('username')}
                        />
                        <TextInput
                            label='Email'
                            placeholder='email@example.com'
                            variant='filled'
                            size='md'
                            required
                            styles={{
                                input: {
                                    background: 'transparent', border: '1px solid #606064', color: 'white', "::placeholder": { color: '#444448' },
                                    ":focus-within": { border: '1px solid #3071E8' },
                                    ":focus": { borderColor: '#3071E8 !important' }
                                },
                                label: { color: '#A2A2A3', fontWeight: 400 },
                            }}
                            {...form.getInputProps('email')}
                        />

                        <PasswordInput
                            label='Password'
                            placeholder='Enter your password'
                            variant='filled'
                            size='md'
                            required
                            styles={{
                                innerInput: { "::placeholder": { color: '#444448' }, color: 'white' },
                                input: { background: 'transparent', border: '1px solid #606064', ":focus-within": { borderColor: '#3071E8 !important' } },
                                label: { color: '#A2A2A3', fontWeight: 400 },
                            }}
                            {...form.getInputProps('password')}
                        // onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                        <Button variant='filled' size='md' className="bg-[#3071E8] hover:bg-[#457fec]" type='submit'>Sign Up</Button>
                        <Button variant='outline' size='md' leftIcon={<AiOutlineGoogle color="#3071E8" />} className="border-[#383737] text-white hover:bg-[#75727148]" onClick={signUpWithGoogle}> Sign up with Google </Button>
                    </div>
                </form>
                <p className="self-center mt-8 text-white"> Already have an account? <Link className="text-[#3071E8]" to="/login">Sign in</Link></p>
            </div>
        </div>
    );
}

export default SignupPage;