import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, TextField } from '@mui/material'

interface IFormInput {
    firstName: string,
    lastName: string,
    iceCreamType: { label: string; value: string };
}

export default function Signup() {
    const { register, errors, handleSubmit } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = (data)=>{
        console.log('Success')
        console.log(data)
    }
    console.log("Errors:", errors)
    return(
        <form onSubmit = {handleSubmit(onSubmit)}>
          <TextField 
            id = 'username' 
            label = 'Username'
            {...register('username', {required: true})} 
          />
          <Button variant='contained' type='submit'> Sign up</Button>  
        </form>
    )
}