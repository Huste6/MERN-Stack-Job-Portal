import React, { useRef, useState } from 'react'
import Navbar from './share/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Contact, ImageUp, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import UseGetAllAppliedJob from './hooks/UseGetAllAppliedJob';
import { Image } from 'antd';
import axios from 'axios';
import { USER_API_END_POINT } from './utils/constant';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from './ui/toast';
import { setAuthUser } from './redux/authSlice';
import LaterJobTable from './LaterJobTable';

const isResume = true;

const Profile = () => {
    const { user } = useSelector(store => store.auth);
    const [open, setOpen] = useState(false);
    UseGetAllAppliedJob();
    const dispatch = useDispatch();
    const fileInputRef = useRef(null); //lay ra o input
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file)
            const fetchApiUploadImage = async () => {
                try {
                    const res = await axios.post(`${USER_API_END_POINT}/profile/update/img`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        withCredentials: true
                    })
                    if (res.data.success) {
                        toast({
                            title: res.data.message,
                            status: "success",
                            action: (
                                <ToastAction altText="OK">
                                    OK
                                </ToastAction>
                            ),
                        });
                        dispatch(setAuthUser(res.data.user))
                    }
                } catch (error) {
                    console.error(error);
                    toast({
                        title: error.response?.data?.message || 'Cập nhật thất bại',
                        status: "error",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                    });
                }
            }
            fetchApiUploadImage();
        }
    };
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center flex-col'>
                            <Image
                                width={100}
                                height={100}
                                className='object-cover rounded-full'
                                src={user.profile.profilePhoto ? (user.profile.profilePhoto) : ("https://github.com/shadcn.png")}
                            />
                            <Button variant='outline' className='gap-2 mt-5' onClick={handleButtonClick}>
                                <ImageUp />
                                <span>Upload image</span>
                            </Button>
                            <input
                                type='file'
                                accept='image/*'
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div>
                            <h1 className='font-bold text-xl'>{user.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className='text-right'><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div>
                    <h1 className='text-md font-bold'>Skills</h1>
                    <div className='flex items-center gap-2 my-2'>
                        {user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>}
                    </div>
                </div>
                <div className='flex flex-col mt-5'>
                    <Label className='text-md font-bold'>Hồ sơ</Label>
                    {
                        isResume ? <a href={user?.profile?.resume} className='text-blue-600'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-7xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl my-5 p-8'>
                <h1 className='font-bold text-lg my-5'>Công việc đã apply</h1>
                <AppliedJobTable />
            </div>
            <div className='max-w-7xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-xl my-5 p-8'>
                <h1 className='font-bold text-lg my-5'>Công việc đã lưu</h1>
                <LaterJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile