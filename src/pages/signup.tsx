import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, TextField, Grid } from '@mui/material'

interface IFormInput {
    firstName: string,
    lastName: string,
    iceCreamType: { label: string; value: string };
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
            spacing = {2}
          >
            <Grid item>
                <TextField
                    variant= 'outlined'
                    id = 'username' 
                    label = 'Username'
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
            <Grid>
                <Button variant='contained' type='submit'> Sign up</Button>
            </Grid>
          </Grid> 
        </form>
    )
}