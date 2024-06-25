import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, TextField, Grid } from '@mui/material'
import { signUp } from 'aws-amplify/auth';

interface IFormInput {
    username: string,
    email: string,
    password: string
}

export default function Signup() {
    const { register, formState: {errors}, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = (data)=>{
        console.log('Success')
        console.log(data)
    }
    console.log("Errors:", errors)
    return(
        <form onSubmit = {handleSubmit(onSubmit)} autoComplete='off'>
          <Grid
            container
            direction = 'column'
            alignItems = 'center'
            justifyContent = 'center'
            style={{ paddingTop: '1.25rem' }}
          >
            <Grid item>
                <TextField
                    variant= 'outlined'
                    id = 'username' 
                    label = 'Username'
                    type = 'text'
                    error = {errors.username ? true : false}
                    helperText = {errors.username ? errors.username.message : null}
                    {...register('username', {
                        required: {value: true, message: 'Please enter a username.'},
                        minLength: {
                            value: 3,
                            message: 'Please enter a username between 3-16 characters'
                        },
                        maxLength: {
                            value: 16,
                            message: 'Please enter a username between 3-16 characters'
                        }
                    })} 
                />
            </Grid>

            <Grid item>
                <TextField
                    variant= 'outlined'
                    id = 'email' 
                    label = 'Email'
                    type = 'email'
                    error = {errors.email ? true : false}
                    helperText = {errors.email ? errors.email.message : null}
                    {...register('email', {
                        required: {value: true, message: 'Please enter a valid email.'},
    
                    })} 
                />
            </Grid>

            <Grid item>
                <TextField
                    variant= 'outlined'
                    id = 'password' 
                    label = 'Password'
                    type = 'password'
                    error = {errors.password ? true : false}
                    helperText = {errors.password ? errors.password.message : null}
                    {...register('password', {
                        required: {value: true, message: 'Please enter a password.'},
                        minLength: {
                            value: 8,
                            message: 'Please enter a stronger password'
                        },
                      
                    })} 
                />
            </Grid>

            <Grid style={{marginTop: "16px"}}>
                <Button variant='contained' type='submit'> Sign up</Button>
            </Grid>
          </Grid> 
        </form>
    )
}