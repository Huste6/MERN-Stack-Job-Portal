import React, { useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Lock, MoreHorizontal, Trash2, Unlock } from 'lucide-react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { message } from 'antd';

const TableUser = ({ fetchGetAllUser, data, role }) => {
    const handleLockAccount = async (locked, id) => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/admin/lockAccount`, {
                locked,
                id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                message.success(res.data.message)
                fetchGetAllUser;
            }
        } catch (error) {
            console.error(error);
            message.success(error.response?.data?.message)
        }
    }
    const handleDeleteAccount = async (id) => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/admin/deleteAccount`, {
                id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                message.success(res.data.message)
                fetchGetAllUser;
            }
        } catch (error) {
            console.error(error);
            message.error(error.response?.data?.message)
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of accounts</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        {role === 'student' && (
                            <TableHead>Status</TableHead>
                        )}
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="5" className="text-center">
                                No data
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Button variant='outline' size='icon' className='p-6'>
                                        <Avatar>
                                            <AvatarImage src={item?.profile?.profilePhoto || "https://github.com/shadcn.png"} className='object-cover' alt={item?.fullName} />
                                        </Avatar>
                                    </Button>
                                </TableCell>
                                <TableCell>{item?.fullName}</TableCell>
                                <TableCell>{item?.email}</TableCell>
                                <TableCell>{item?.phoneNumber}</TableCell>
                                {role === 'student' && (
                                    <TableCell>
                                        <Badge className={`${item?.locked ? 'bg-red-400 hover:bg-red-500' : 'bg-green-400 hover:bg-green-500'}`}>
                                            {item?.locked ? 'Locked' : 'Unlocked'}
                                        </Badge>
                                    </TableCell>
                                )}
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-30 p-0'>
                                            {role === 'student' ? (
                                                <>
                                                    <div onClick={() => handleLockAccount(!item?.locked, item?._id)}>
                                                        {item?.locked ? (
                                                            <div className='flex items-center w-full cursor-pointer gap-2 border-b p-4 hover:bg-gray-100'>
                                                                <Unlock className='w-4' />
                                                                <span>Unlock Account</span>
                                                            </div>
                                                        ) : (
                                                            <div className='flex items-center w-full cursor-pointer gap-2 border-b p-4 hover:bg-gray-100'>
                                                                <Lock className='w-4' />
                                                                <span>Lock Account</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='flex items-center w-full cursor-pointer gap-2 border-b p-4 hover:bg-gray-100' onClick={() => handleDeleteAccount(item?._id)}>
                                                        <Trash2 className='w-4' />
                                                        <span>Delete Account</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='flex items-center w-full cursor-pointer gap-2 border-b p-4 hover:bg-gray-100' onClick={() => handleDeleteAccount(item?._id)}>
                                                    <Trash2 className='w-4' />
                                                    <span>Delete Account</span>
                                                </div>
                                            )}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default TableUser;