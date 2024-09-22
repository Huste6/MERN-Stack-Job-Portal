import React, { useEffect } from 'react';
import Navbar from '../share/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { ToastAction } from '../ui/toast';
import { toast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setLoading } from '../redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const {loading,user} = useSelector(store => store.auth);
    const onSubmit = async (data) => {
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user))
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
            } else {
                toast({
                    title: res.data.message || 'Login failed. Please try again.',
                    status: "error",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại!',
                status: "error",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        } finally {
            dispatch(setLoading(false))
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
                    <h1 className='font-bold text-xl mb-5'>Đăng Nhập</h1>

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
                        <a href='/forgot-password' className='text-blue-600 text-sm'>Quên mật khẩu?</a>
                    </div>
                    {loading ? (
                        <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/> Xin đợi 1 chút</Button>
                    ) : (
                        <Button className='w-full my-4' type="submit">Đăng Nhập</Button>
                    )}           
                    <span>Bạn chưa có tài khoản? <Link to="/signup" className='text-blue-600 ml-2'>Đăng Ký</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Login;