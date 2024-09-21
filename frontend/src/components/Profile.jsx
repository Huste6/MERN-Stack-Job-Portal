import React, { useState } from 'react'
import Navbar from './share/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import UseGetAllAppliedJob from './hooks/UseGetAllAppliedJob';

const isResume = true;

const Profile = () => {
    const { user } = useSelector(store => store.auth);
    const [ open,setOpen ] = useState(false);
    UseGetAllAppliedJob();
    
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className='h-24 w-24 object-cover rounded-full'>
                            <AvatarImage src={user.profile.profilePhoto ? (user.profile.profilePhoto) : ("https://github.com/shadcn.png")} />
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-xl'>{user.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={()=>setOpen(true)} variant="outline" className='text-right'><Pen /></Button>
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
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile