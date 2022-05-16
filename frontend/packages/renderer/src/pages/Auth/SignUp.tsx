import * as React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai'
import { Anchor, Box, Button, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { FirebaseError, initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { ref, getDatabase, onValue } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { signInUser, signOutLocal } from '@/redux/slices/authSlice';
import { useCreateUserMutation } from '@/redux/api/authEndpoints';

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

export const SignupPage = () => {
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

    const [createUserMutation] = useCreateUserMutation();

    const createUserBackend = async (user: User) => {

        const token = await user.getIdToken();
        if (token) {
            createUserMutation({
                user: {
                    token: token,
                    email: user.email,
                    name: form.values.username
                }
            });
        }
    }

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

    const signUpWithEmail = async ({ username, email, password }: typeof form.values) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password).then((val) => {
                updateProfile(val.user, { displayName: username });
                createUserBackend(val.user)
            });
        } catch (err) {
            const error = err as FirebaseError;
            console.log(error)
            if (error.code === 'auth/email-already-in-use') {
                form.setErrors({ email: 'This email is already in use!' })
            }
        }
    }

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log(user);
                user.getIdToken().then((val) => {
                    dispatch(signInUser(val));

                });
                if (location.state) {
                    navigate((location.state as LocationState).from, { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
            } else {
                dispatch(signOutLocal());
            }
        });

        return () => {
            unsubscribe()
        };
    }, [auth])


    return (
        <Group align={'center'} position={'center'} sx={{ width: '100%', height: '100%' }}>
            <Stack sx={{ gap: '1rem', maxWidth: '20rem', width: '100%' }}>
                <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={form.onSubmit(signUpWithEmail)}>
                    <Title order={1} sx={{ textTransform: 'uppercase', fontSize: '2.25rem', lineHeight: '2.5rem', color: 'white', fontWeight: 500 }}>
                        Sign Up
                    </Title>
                    <Stack sx={{ gap: '1rem' }}>
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

                    </Stack>
                    <Stack sx={{ gap: '1rem', marginTop: '2rem' }} align={'center'}>
                        <Button fullWidth variant='filled' size='md' type='submit'> Sign Up </Button>
                        <Button fullWidth variant='outline' size='md' leftIcon={<AiOutlineGoogle color="#3071E8" />} onClick={signUpWithGoogle}> Sign up with Google </Button>

                    </Stack>
                </Box>
                <Text sx={{ color: 'white', marginTop: '2rem', alignSelf: 'center' }}> Already have an account? <Anchor component={Link} to="/login" sx={{ color: '#3071E8' }}>Sign in</Anchor></Text>
            </Stack>
        </Group>
    );
}
