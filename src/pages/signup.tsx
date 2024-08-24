import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Grid } from '@mui/material';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useUser } from '@/context/AuthContext';

interface IFormInput {
    username: string;
    email: string;
    password: string;
    code: string;
}

export default function Signup() {
    const { user, setUser } = useUser();
    const [open, setOpen] = useState(false);
    const [signUpError, setSignUpError] = useState<string>("");
    const [showCode, setShowCode] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");

    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        showCode ? await handleConfirmSignUp(data) : await handleSignUp(data);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    async function handleSignUp(data: IFormInput) {
        const { username, password, email } = data;
        try {
            const result = await signUp({
                username,
                password,
                options: {
                    userAttributes: {
                        email
                    },
                    autoSignIn: { enabled: true }
                }
            });
            
            console.log("Signup result:", result);
            if (result?.nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
                setShowCode(true);
                setUsername(username);
            } else {
                // Handle other cases or automatically log the user in
            }

        } catch (error) {
            console.error("SignUp error:", error);
            setSignUpError(error.message || "Sign-up failed. Please try again.");
            setOpen(true);
        }
    }

    async function handleConfirmSignUp(data: IFormInput) {
        const { code } = data;
        try {
            const result = await confirmSignUp({
                username,
                confirmationCode: code
            });
            
            console.log("Confirm signup result:", result);
            if (result?.isSignUpComplete) {
                console.log("Sign-up confirmation successful");
            } else {
                console.log("Sign-up confirmation failed");
            }
        } catch (error) {
            console.error("Confirm sign-up error:", error);
            setSignUpError(error.message || "Confirmation failed. Please try again.");
            setOpen(true);
        }
    }
    console.log("Signed in user:", user)
    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <Grid
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                style={{ paddingTop: '1.25rem' }}
            >
                <Grid item>
                    <TextField
                        variant='outlined'
                        id='username'
                        label='Username'
                        type='text'
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        {...register('username', {
                            required: { value: true, message: 'Please enter a username.' },
                            minLength: { value: 3, message: 'Username must be between 3-16 characters.' },
                            maxLength: { value: 16, message: 'Username must be between 3-16 characters.' }
                        })}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        variant='outlined'
                        id='email'
                        label='Email'
                        type='email'
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        {...register('email', {
                            required: { value: true, message: 'Please enter a valid email.' },
                        })}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        variant='outlined'
                        id='password'
                        label='Password'
                        type='password'
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register('password', {
                            required: { value: true, message: 'Please enter a password.' },
                            minLength: { value: 8, message: 'Password must be at least 8 characters long.' },
                        })}
                    />
                </Grid>

                {showCode && (
                    <Grid item>
                        <TextField
                            variant='outlined'
                            id='code'
                            label='Verification Code'
                            type='text'
                            error={!!errors.code}
                            helperText={errors.code?.message}
                            {...register('code', {
                                required: { value: true, message: 'Please enter the verification code.' },
                                minLength: { value: 6, message: 'Invalid verification code.' },
                                maxLength: { value: 6, message: 'Invalid verification code.' }
                            })}
                        />
                    </Grid>
                )}

                <Grid style={{ marginTop: "16px" }}>
                    <Button variant='contained' type='submit'> Sign Up</Button>
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {signUpError}
                </Alert>
            </Snackbar>
        </form>
    );
}
