import React,{useEffect,useState} from 'react'
import {Input,Button} from '../index';
import { useForm } from "react-hook-form";

import authService from '../../Api/auth' 
import {useNavigate} from 'react-router-dom'
function SignUp() {
        
    const [error,setError]=useState("")
    const navigator=useNavigate();
    const { register, handleSubmit } = useForm()



    const handleSignup=async (data)=>{

        setError('');
        const {name,email,phone,image}=data;

       
       try {
                const response = await authService.signup(data);
                if (response) {
                    navigator('/');
                }
            } catch (err) {
                setError('Signup failed');
                console.error(err);
            }

    }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSignup,(err)=>{ console.error("Validation error:", err);})} className='mt-8'>
                <div className='space-y-5'>

                    <Input
                        label="Full Name:"
                        placeholder="Enter your full name"
                        {...register("name",{
                            required:true
                        })}
                    />

                    <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                        })}
                    />
                    <Input
                        label="phone: "
                        placeholder="Enter your phone"
                        type="phone"
                        {...register("phone", {
                            required: true,
                        })}
                    />
                    <Input
                        label="image: "
                        placeholder="upload your image"
                        type="file"
                        {...register("image[]", {
                            required: true,
                        })}
                    />
                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button
                        type="submit"
                        className="flex items-center justify-center  hover:bg-blue-400"
                        ButtonsText="Signup"
                    ></Button>
                </div>
            </form>
    </div>
  )
}

export default SignUp
