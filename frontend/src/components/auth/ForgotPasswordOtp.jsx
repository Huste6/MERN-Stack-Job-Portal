import React from 'react';
import Navbar from '../share/Navbar';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Mail } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ForgotPasswordOtp = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/password/forgot/otp`, {
                email: email,
                otp: data.otp
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast({
                    title: res.data.message,
                    status: "success",
                    action: <ToastAction altText="OK">OK</ToastAction>,
                });
                navigate(`/reset-password/${email}`);
            }
        } catch (error) {
            console.error(error);
            toast({
                title: error.response?.data?.message,
                status: "error",
                action: <ToastAction altText="OK">OK</ToastAction>,
            });
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={handleSubmit(onSubmit)} className='border border-gray-200 rounded-sm p-4 mx-auto'>
                    <div className='flex items-center mb-5'>
                        <Button onClick={() => navigate('/forgot-password')} variant='outline' className='flex items-center gap-2'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl ml-20'>Nhập mã OTP xác thực</h1>
                    </div>
                    <div className='flex items-center flex-col my-10'>
                        <div className='text-gray-600 text-lg'>Mã xác thực sẽ được gửi qua Gmail đến</div>
                        <div className='flex items-center gap-2'>
                            <Mail />
                            <div className='text-gray-600 text-lg'>{email}</div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center mb-10'>
                        <InputOTP maxLength={8} {...register('otp')}>
                            <InputOTPGroup {...register('otp')}>
                                {[...Array(8)].map((_, index) => (
                                    <InputOTPSlot
                                        key={index}
                                        index={index}
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <Button className='w-full my-4' type='submit'>Xác nhận</Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordOtp;