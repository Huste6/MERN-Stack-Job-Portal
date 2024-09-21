import React, { useEffect, useState } from 'react';
import Navbar from './share/Navbar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOP_API_END_POINT } from './utils/constant';
import { setSingleJob } from '../components/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from './ui/toast';
import { Loader2 } from 'lucide-react';

const JobDescription = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;
    const { user } = useSelector(store => store.auth);
    const [loading,setLoading] = useState(false);
    const { singleJob } = useSelector(store => store.job);
    const initIsApplied = singleJob?.applications?.some(item => item.applicant === user?._id);
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOP_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setIsApplied(initIsApplied);
                    dispatch(setSingleJob(res.data.job));     
                }
            } catch (error) {
                console.error("Error fetching job data:", error);
            }
        };
        fetchAllJobs();
    }, [jobId, user?._id]);

    const dateString = singleJob?.createdAt;
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDate = `Ngày ${day} tháng ${month} năm ${year}`;

    const handleApplyJob = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
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
            console.error("Error applying for job:", error);
            toast({
                title: "Error applying for job",
                status: "error",
            });
        } finally {
            setLoading(false)
            setIsApplied(true)
        }
    };

    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.position} positions</Badge>
                            <Badge className='text-red-500 font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className='text-purple-700 font-bold' variant="ghost">{singleJob?.salary} triệu</Badge>
                        </div>
                    </div>
                    {loading ? (
                        <Button className='rounded-lg cursor-pointer'><Loader2 className='animate-spin' /> Xin đợi 1 chút</Button>
                    ) : (
                        <Button
                            disabled={isApplied}
                            className={`rounded-lg cursor-pointer ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#54038a]'}`}
                            onClick={isApplied ? () => { } : handleApplyJob}
                        >
                            {isApplied ? 'Nộp đơn thành công' : 'Nộp đơn'}
                        </Button>
                    )}
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium py-5'>Mô tả công việc</h1>
                <div className='my-5'>
                    <h1 className='font-bold my-1'>Company Name: <span className='pl-4 font-normal text-gray-800'>{singleJob?.company?.name}</span></h1>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} triệu</span></h1>
                    <h1 className='font-bold my-1'>Total applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{formattedDate}</span></h1>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;