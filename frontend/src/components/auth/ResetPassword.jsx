import React from 'react'
import Navbar from '../share/Navbar'
import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';

const ResetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    const email = params.email;
    const onSubmit = (data) => {
        try {
            const fetchApiResetPassword = async () => {
                const res = await axios.post(`${USER_API_END_POINT}/password/reset`,{
                    email: email,
                    password: data.password
                },{
                    withCredentials: true
                })
                if(res.data.success){
                    toast({
                        title: res.data.message,
                        status: "success",
                        action: <ToastAction altText="OK">OK</ToastAction>,
                    });
                    navigate('/login');
                }
            }
            fetchApiResetPassword();
        } catch (error) {
            console.error(error);
            toast({
                title: error.response?.data?.message,
                status: "error",
                action: <ToastAction altText="OK">OK</ToastAction>,
            });
        }

    }
    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={handleSubmit(onSubmit)} className='border border-gray-200 rounded-sm p-4 mx-auto'>
                    <div className='flex items-center mb-5'>
                        <Button onClick={() => navigate('/')} variant='outline' className='flex items-center gap-2'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl ml-32'>Reset Password</h1>
                    </div>
                    <div className='mb-4'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            type='email'
                            id='email'
                            defaultValue={email}
                            disabled={true}
                            {...register('email')}
                        />
                    </div>
                    <div className='mb-4'>
                        <Label htmlFor='password'>Mật khẩu mới</Label>
                        <Input
                            type='password' 
                            id='password'
                            {...register('password', { required: 'password là bắt buộc' })} 
                        />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <Button className='w-full my-4' type='submit'>Xác nhận</Button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword