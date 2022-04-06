import * as React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai'
import { Anchor, Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { Link } from 'react-router-dom';

const schema = z.object({
    email: z.string().email({ message: 'Invalid Email' }),
    password: z.string().nonempty({ message: 'Password cannot be empty' })
})

const AuthPage = () => {

    const form = useForm({
        initialValues: {
            email: '',
            password: ''
        },
        schema: zodResolver(schema)
    });

    const signInWithGoogle = () => {

    }

    const signInWithEmail = ({ email, password }: typeof form.values) => {
        console.log(email, password);
    }

    return (
        <div className="flex w-full h-full items-center justify-center">
            <div className="flex flex-col gap-4 max-w-xs w-full">
                <form className="flex flex-col gap-4" onSubmit={form.onSubmit(signInWithEmail)}>
                    <h1 className="text-white font-medium text-4xl">Sign In</h1>
                    <div className="flex flex-col gap-4">
                        <TextInput
                            label='Email'
                            placeholder='email@example.com'
                            variant='filled'
                            size='md'
                            required
                            styles={{
                                input: {
                                    background: 'transparent', border: '1px solid #606064', color: 'white', "::placeholder": { color: '#444448' },
                                    ":focus-within": { border: '1px solid #B24323' },
                                    ":focus": { borderColor: '#B24323 !important' }
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
                                input: { background: 'transparent', border: '1px solid #606064', ":focus-within": { borderColor: '#B24323 !important' } },
                                label: { color: '#A2A2A3', fontWeight: 400 },
                            }}
                            {...form.getInputProps('password')}
                        // onChange={(e) => setPassword(e.target.value)}
                        />

                        <Anchor className="self-end -mt-2 text-[#515154]">Forgot Password?</Anchor>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button variant='filled' size='md' className="bg-[#B24323] hover:bg-[#dd522b]" type='submit'>Sign In</Button>
                        <Button variant='outline' size='md' leftIcon={<AiOutlineGoogle color="#B24323" />} className="border-[#383737] text-white hover:bg-[#75727148]"> Sign in with Google </Button>
                    </div>
                </form>
                <p className="self-center mt-8 text-white"> Don't have an account? <Link className="text-[#B24323]" to='/'>Sign up</Link></p>
            </div>
        </div>
    );
}

export default AuthPage;