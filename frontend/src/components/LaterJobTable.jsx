import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import axios from 'axios';
import { JOB_LATER_API_END_POINT } from './utils/constant';
import { Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { message, Popconfirm } from 'antd';

const LaterJobTable = () => {
    const [LaterJob, setLaterJob] = useState([]);
    const navigate = useNavigate();
    const fetchApiGetLater = async () => {
        const res = await axios.get(`${JOB_LATER_API_END_POINT}/get`, {
            withCredentials: true
        });
        if (res.data.success) {
            setLaterJob(res.data.getAllLaterJob);
        }
    }
    useEffect(() => {
        fetchApiGetLater();
    }, [])

    const handleDeleteLaterJob = (jobId, companyId) => {
        try {
            const fetchApiDeleteLaterJob = async () => {
                const res = await axios.delete(`${JOB_LATER_API_END_POINT}/delete`, {
                    data: { jobId, companyId },
                    withCredentials: true
                })
                if (res.data.success) {
                    message.success(res.data.message);
                    fetchApiGetLater();
                }
            }
            fetchApiDeleteLaterJob();
        } catch (error) {
            console.error(error);
            message.error(error.response?.data?.message)
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>Danh sách công việc bạn đã lưu</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Thời gian</TableHead>
                        <TableHead>Tên công việc</TableHead>
                        <TableHead>Tên công ty</TableHead>
                        <TableHead>Trạng thái</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        LaterJob.length === 0 ? (
                            <>
                                <TableRow>
                                    <TableCell className='font-bold text-md'>Chưa lưu công việc nào</TableCell>
                                </TableRow>
                            </>
                        ) : (
                            LaterJob.map((job, index) => {
                                const date = new Date(job?.createdAt).toISOString().split('T')[0];
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{date}</TableCell>
                                        <TableCell>{job?.job?.title}</TableCell>
                                        <TableCell>{job?.company?.name}</TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            <Eye className='cursor-pointer w-5 h-5' onClick={() => navigate(`/description/${job?.job._id}`)} />
                                            <Popconfirm
                                                title="Delete the job later"
                                                description="Are you sure to delete this job later?"
                                                onConfirm={() => handleDeleteLaterJob(job?.job._id, job?.company?._id)}
                                                onCancel={() => message.info('Hủy')}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Trash2 className='cursor-pointer w-5 h-5'/>
                                            </Popconfirm>
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

export default LaterJobTable