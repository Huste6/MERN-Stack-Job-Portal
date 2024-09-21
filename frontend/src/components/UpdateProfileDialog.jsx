import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setLoading } from './redux/authSlice';
import { ToastAction } from './ui/toast';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { user, loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [dataUser, setdataUser] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: user?.profile?.resume || ""
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('file', data.resume[0]);
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('bio', data.bio);
        formData.append('skills', data.skills);
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
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
            console.error(error);
            toast({
                title: error.response?.data?.message || 'Cập nhật thất bại',
                status: "error",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        } finally {
            setOpen(false);
            dispatch(setLoading(false));
        }
    };


    const handleInputChange = (e) => {
        const { name, defaultValue } = e.target;
        setdataUser(prev => ({
            ...prev,
            [name]: defaultValue,
        }));
    };

    return (
        <Dialog open={open}>
            <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='fullName' className='text-left'>Full Name</Label>
                            <Input
                                type='text'
                                id='fullName'
                                name='fullName'
                                defaultValue={dataUser.fullName}
                                onChange={handleInputChange}
                                {...register("fullName")}
                                className='col-span-3'
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='email' className='text-left'>Email</Label>
                            <Input
                                type='email'
                                id='email'
                                name='email'
                                defaultValue={dataUser.email}
                                onChange={handleInputChange}
                                {...register("email")}
                                className='col-span-3'
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='phoneNumber' className='text-left'>Phone Number</Label>
                            <Input
                                type='text'
                                id='phoneNumber'
                                name='phoneNumber'
                                defaultValue={dataUser.phoneNumber}
                                onChange={handleInputChange}
                                {...register("phoneNumber")}
                                className='col-span-3'
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='bio' className='text-left'>Bio</Label>
                            <Input
                                type='text'
                                id='bio'
                                name='bio'
                                defaultValue={dataUser.bio}
                                onChange={handleInputChange}
                                {...register("bio")}
                                className='col-span-3'
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='skills' className='text-left'>Skills</Label>
                            <Input
                                type='text'
                                id='skills'
                                name='skills'
                                defaultValue={dataUser.skills}
                                onChange={handleInputChange}
                                {...register("skills")}
                                className='col-span-3'
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className='text-left'>Resume</Label>
                            <Input
                                type="file"
                                accept="application/pdf"
                                id="file"
                                name="resume"
                                {...register("resume")}
                                className='col-span-3'
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className='w-full my-4' disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Xin đợi 1 chút
                            </Button>
                        ) : (
                            <Button className='w-full my-4' type="submit">Cập nhật</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
