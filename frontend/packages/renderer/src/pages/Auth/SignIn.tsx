import * as React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai'
import { Anchor, Box, Button, Group, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { FirebaseError, initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, getDatabase, onValue } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { signInUser, signOutLocal } from '@/redux/slices/authSlice';

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

export const SignInPage = () => {
    const auth = getAuth();

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        schema: zodResolver(schema)
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const signInWithGoogle = async () => {
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

    const signInWithEmail = async ({ email, password }: typeof form.values) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            const error = err as FirebaseError;
            form.setErrors({ email: 'Wrong email or password' });
            console.log(error.message, error.code)
        }
    }

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log(user);
                user.getIdToken().then((val) => {
                    dispatch(signInUser(val));
                });

                setTimeout(() => {
                    if (location.state) {
                        navigate((location.state as LocationState).from, { replace: true });
                    } else {
                        navigate('/', { replace: true });
                    }
                }, 300)
            } else {
                dispatch(signOutLocal())
            }
        });

        return () => {
            unsubscribe()
        };
    }, [auth])


    return (
        <Group align={'center'} position={'center'} sx={{ width: '100%', height: '100%' }}>
            <Stack sx={{ gap: '1rem', maxWidth: '20rem', width: '100%' }}>
                <Box component='form' sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={form.onSubmit(signInWithEmail)}>
                    <Title order={1} sx={{ textTransform: 'uppercase', fontSize: '2.25rem', lineHeight: '2.5rem', color: 'white', fontWeight: 500 }}>
                        Sign In
                    </Title>
                    <Stack sx={{ gap: '1rem' }}>
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

                        <Anchor sx={{ alignSelf: 'self-end', marginTop: '-0.5rem', color: '#515154' }}>Forgot Password?</Anchor>
                    </Stack>
                    <Stack sx={{ gap: '1rem' }} align={'center'}>
                        <Button fullWidth variant='filled' size='md' type='submit'> Sign In </Button>
                        <Button fullWidth variant='outline' size='md' leftIcon={<AiOutlineGoogle color="#3071E8" />} onClick={signInWithGoogle}> Sign in with Google </Button>
                    </Stack>
                </Box>
                <Text sx={{ color: 'white', marginTop: '2rem', alignSelf: 'center' }}> Don't have an account? <Anchor component={Link} to="/signup" sx={{ color: '#3071E8' }}>Sign up</Anchor></Text>
            </Stack>
        </Group>
    );
}
