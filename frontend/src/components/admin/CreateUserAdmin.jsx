import React, { useState } from 'react'
import Navbar from '../share/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2Icon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '../ui/toast'
import { USER_API_END_POINT } from '../utils/constant'
import axios from 'axios'

const CreateUserAdmin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('file', data.file[0]);
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('role', 'recruiter');
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/");
                toast({
                    title: res.data.message,
                    status: "success",
                    action: (
                        <ToastAction altText="OK">
                            OK
                        </ToastAction>
                    ),
                });
            }
        } catch (error) {
            toast({
                title: error.response.data.message,
                status: "error",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Navbar />

            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form className='shadow w-1/2 border border-gray-200 rounded-sm p-4 my-10' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='font-bold text-xl mb-5'>Tạo tài khoản admin mới</h1>

                    <div className='my-2'>
                        <Label htmlFor="fullName">Họ và Tên</Label>
                        <Input
                            type="text"
                            id="fullName"
                            placeholder="Le van A"
                            {...register("fullName", { required: true })}
                        />
                        {errors.fullName && <span className="text-red-500">Họ và Tên là bắt buộc</span>}
                    </div>

                    <div className='my-2'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="a@gmail.com"
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-500">Email là bắt buộc</span>}
                    </div>

                    <div className='my-2'>
                        <Label htmlFor="phoneNumber">Số điện thoại</Label>
                        <Input
                            type="text"
                            id="phoneNumber"
                            placeholder="Số điện thoại"
                            {...register("phoneNumber", { required: true })}
                        />
                        {errors.phoneNumber && <span className="text-red-500">Số điện thoại là bắt buộc</span>}
                    </div>

                    <div className='my-2'>
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input
                            type="password"
                            id="password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && <span className="text-red-500">Mật khẩu là bắt buộc</span>}
                    </div>

                    <div className='my-2'>
                        <Label>Profile</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            {...register("file")}
                            className='cursor-pointer'
                        />
                    </div>
                    <Button className='w-full my-4' type="submit">Tạo mới</Button>
                </form>
            </div>
        </div>
    )
}

export default CreateUserAdmin