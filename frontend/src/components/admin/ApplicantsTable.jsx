import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, SquareCheckBig, SquareX } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../utils/constant';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import { Button } from '../ui/button';

const ApplicantsTable = () => {
    const { AllApplicants } = useSelector(store => store.application);

    const handleChangeStatus = async (status, id) => {
        try {
            const res = await axios.patch(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, { withCredentials: true })
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
            }
        } catch (error) {
            console.error(error);
            toast({
                title: error.response?.data?.message,
                status: "error",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list user applied</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        AllApplicants.applications <= 0 ? (
                            <span>Chưa có ứng viên nào nộp CV</span>
                        ) : (
                            AllApplicants?.applications.map((item, index) => {
                                const date = new Date(item.createdAt).toISOString().split('T')[0];
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{item?.applicant?.fullName}</TableCell>
                                        <TableCell>{item?.applicant?.email}</TableCell>
                                        <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                        <TableCell>
                                            {
                                                item?.applicant?.profile?.resume ? (
                                                    <a href={item?.applicant?.profile?.resume} target='_blank' rel='noopener noreferrer' className='text-blue-600 cursor-pointer'>{item?.applicant?.profile?.resumeOriginalName}</a>
                                                ) : (
                                                    <span>NA</span>
                                                )
                                            }

                                        </TableCell>
                                        <TableCell>{date}</TableCell>
                                        <TableCell>
                                            <div className="relative">
                                                {item?.status === 'accepted' ? (
                                                    <Button
                                                        className="bg-green-600 rounded-md"
                                                    >
                                                        Accepted
                                                    </Button>
                                                ) : item?.status === 'rejected' ? (
                                                    <Button
                                                        className="bg-red-600 rounded-md"
                                                    >
                                                        Rejected
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className="bg-gray-400 hover:bg-gray-500 rounded-md"
                                                    >
                                                        Pending
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className='text-right'>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <MoreHorizontal />
                                                </PopoverTrigger>
                                                <PopoverContent className='w-30 p-0'>
                                                    <div onClick={() => handleChangeStatus('Accepted', item?._id)} className="group flex items-center w-full cursor-pointer gap-2 border-b p-4 hover:bg-gray-100">
                                                        <SquareCheckBig className="w-4 group-hover:text-green-400" />
                                                        <span>Accepted</span>
                                                    </div>
                                                    <div onClick={() => handleChangeStatus('Rejected', item?._id)} className="group flex items-center w-full cursor-pointer gap-2 p-4 hover:bg-gray-100">
                                                        <SquareX className="w-4 group-hover:text-red-400" />
                                                        <span>Rejected</span>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable