import React, { useState } from 'react';
import Navbar from '../share/Navbar';
import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onSubmit = (data) => {
        try {
            setLoading(true)
            const fetchApiSendOtp = async () => {
                const res = await axios.post(`${USER_API_END_POINT}/password/forgot`, data , {
                    withCredentials: true
                })
                if (res.data.success) {
                    navigate(`/forgot-password/otp?email=${res.data.email}`);
                }
            }
            fetchApiSendOtp();
        } catch (error) {
            console.error(error);
            toast({
                title: error.response?.data?.message,
                status: "error",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        } finally {
            setLoading(false)
        }
    };


    return (
        <div>
            <Navbar />

            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={handleSubmit(onSubmit)} className='border border-gray-200 rounded-sm p-4 mx-auto'>
                    <div className='flex items-center mb-5'>
                        <Button onClick={() => navigate('/login')} variant='outline' className='flex items-center gap-2'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl ml-32'>Lấy lại mật khẩu</h1>
                    </div>
                    <div className='items-center'>
                        <Label htmlFor='email'>Nhập email</Label>
                        <Input
                            type='email'
                            id='email'
                            placeholder='Email'
                            {...register('email', { required: true })}
                        />
                        {errors.email && <span className='text-red-500'>Email is required</span>}
                    </div>
                    <Button className='w-full my-4' type='submit' disabled={loading}>
                        {loading ? (
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        ) : (
                            'Next'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;