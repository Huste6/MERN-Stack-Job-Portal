import React, { useEffect, useState } from 'react';
import Navbar from '../share/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOP_API_END_POINT } from '../utils/constant';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useDispatch, useSelector } from 'react-redux';
import UseGetJob from '../hooks/UseGetJob';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import { setSingleJob } from '../redux/jobSlice';

const EditJob = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;
    UseGetJob(jobId);
    
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate();
    const { singleJob = {} } = useSelector(store => store.job);
    const { AllCompanies = [] } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    setValue('title', singleJob?.title);
    setValue('description', singleJob?.description);
    setValue('salary', singleJob?.salary);
    setValue('location', singleJob?.location);
    setValue('experience', singleJob?.experienceLevel);
    setValue('position', singleJob?.position);
    setValue('jobType', singleJob?.jobType);
    setValue('companyID', singleJob?.company?._id);
    setValue('requirements', singleJob?.requirements.join(', '));

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            data.requirements = data.requirements.split(',').map(requirement => requirement.trim());
            const res = await axios.patch(`${JOP_API_END_POINT}/updateJob/${jobId}`, data, { withCredentials: true });
            if (res.data.success) {
                navigate('/admin/jobs');
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
                title: error.response?.data?.message || "An error occurred",
                status: "error",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        } finally {
            setLoading(false);
        }
    };
    const handleReturn = () => {
        navigate('/admin/jobs');
        dispatch(setSingleJob(null));
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-2xl mx-auto my-10 border shadow-sm p-14'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center mb-5'>
                        <Button variant='outline' className='flex items-center gap-2' onClick={() => handleReturn()}>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl ml-32'>Edit Job</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label htmlFor="title">Job Name</Label>
                            <Input
                                type="text"
                                id="title"
                                defaultValue={singleJob?.title}
                                {...register("title")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="companyID">Company</Label>
                            <Select onValueChange={(value) => setValue('companyID', value)} defaultValue={singleJob?.company?._id} disabled>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Company Name" />
                                </SelectTrigger>
                                <SelectContent>
                                    {AllCompanies.map((company) => (
                                        <SelectItem key={company._id} value={company._id}>
                                            {company.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                type="text"
                                id="description"
                                defaultValue={singleJob?.description}
                                {...register("description")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="requirements">Requirements</Label>
                            <Input
                                type="text"
                                id="requirements"
                                defaultValue={singleJob?.requirements.join(', ')}
                                {...register("requirements")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                type="text"
                                id="salary"
                                defaultValue={singleJob?.salary}
                                {...register("salary")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                type="text"
                                id="location"
                                defaultValue={singleJob?.location}
                                {...register("location")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="jobType">Job Type</Label>
                            <Select onValueChange={(value) => setValue('jobType', value)} defaultValue={singleJob?.jobType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Job Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["Full Time", "Part Time", "Contract", "Freelance", "Internship", "Remote"].map(type => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="experienceLevel">Experience Level</Label>
                            <Input
                                type="number"
                                min={0}
                                id="experienceLevel"
                                defaultValue={singleJob?.experienceLevel}
                                {...register("experienceLevel")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="position">Position</Label>
                            <Input
                                type="number"
                                min={0}
                                id="position"
                                defaultValue={singleJob?.position}
                                {...register("position")}
                            />
                        </div>
                    </div>
                    <Button type='submit' className='w-full mt-8' disabled={loading}>
                        {loading ? (
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                        ) : (
                            'Update'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default EditJob;