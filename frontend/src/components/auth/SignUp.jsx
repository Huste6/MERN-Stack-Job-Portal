import React, { useEffect } from 'react';
import Navbar from '../share/Navbar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice';
import { Loader2 } from 'lucide-react';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const {loading,user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('file', data.file[0]);
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('role', data.role);
        
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
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
                title: error.response.data.message || 'Đăng ký thất bại. Vui lòng thử lại!',
                status: "error",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        } finally {
            dispatch(setLoading(false));
        }
    };
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    })
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form className='shadow w-1/2 border border-gray-200 rounded-sm p-4 my-10' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='font-bold text-xl mb-5'>Đăng Ký</h1>

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

                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-2'>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    type="radio"
                                    value="student"
                                    id="student"
                                    {...register("role", { required: true })}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="student">Student</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    type="radio"
                                    value="recruiter"
                                    id="recruiter"
                                    {...register("role", { required: true })}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        {errors.role && <span className="text-red-500">Vui lòng chọn vai trò</span>}
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                {...register("file")}
                                className='cursor-pointer'
                            />
                        </div>
                    </div>
                    {loading ? (
                        <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/> Xin đợi 1 chút</Button>
                    ) : (
                        <Button className='w-full my-4' type="submit">Đăng Ký</Button>
                    )}    
                    <span>Bạn đã có tài khoản?<Link to="/login" className='text-blue-600 ml-2'>Đăng Nhập</Link></span>
                </form>
            </div>
        </div>
    );
};

export default SignUp;