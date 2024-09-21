import React from 'react';
import Navbar from '../share/Navbar';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice';
import axios from 'axios';
import { JOP_API_END_POINT } from '../utils/constant';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';

const CreateJob = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();
    const { AllCompanies = [] } = useSelector(store => store.company);
    const { loading } = useSelector(store => store.auth);
    const onSubmit = async (data) => {

        try {
            setLoading(true);
            const res = await axios.post(`${JOP_API_END_POINT}/post`, { data }, {
                headers: {
                    'Content-Type': 'application/json'
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
                navigate('/admin/jobs');
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

    return (
        <div>
            <Navbar />
            <div className='max-w-2xl mx-auto my-10 border shadow-sm p-14'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center mb-5'>
                        <Button variant='outline' className='flex items-center gap-2' onClick={() => navigate('/admin/jobs')}>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl ml-32'>Create job</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label htmlFor="title">Job Name</Label>
                            <Input
                                type="text"
                                id="title"
                                {...register("title", { required: "Job Name is required" })}
                            />
                            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="companyID">Company</Label>
                            <Select onValueChange={(value) => setValue('companyID', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Company Name" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        AllCompanies.map((company, index) => (
                                            <SelectItem key={index} value={company?._id}>
                                                {company?.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                type="text"
                                id="description"
                                {...register("description")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="requirements">Requirements</Label>
                            <Input
                                type="text"
                                id="requirements"
                                {...register("requirements")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="salary">Salary</Label>
                            <Input
                                type="text"
                                id="salary"
                                {...register("salary")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                type="text"
                                id="location"
                                {...register("location")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="jobType">Job Type</Label>
                            <Select onValueChange={(value) => setValue('jobType', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Job Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full Time">Full Time</SelectItem>
                                    <SelectItem value="Part Time">Part Time</SelectItem>
                                    <SelectItem value="Contract">Contract</SelectItem>
                                    <SelectItem value="Freelance">Freelance</SelectItem>
                                    <SelectItem value="Internship">Internship</SelectItem>
                                    <SelectItem value="Remote">Remote</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="experience">Experience Level</Label>
                            <Input
                                type="number"
                                min={0}
                                id="experience"
                                {...register("experience")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="position">Position</Label>
                            <Input
                                type="number"
                                min={0}
                                id="position"
                                {...register("position")}
                            />
                        </div>
                    </div>
                    {
                        loading ? (
                            <Button className='w-full mt-8'>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Xin đợi 1 chút
                            </Button>
                        ) : (
                            <Button type='submit' className='w-full mt-8'>Create</Button>
                        )
                    }
                </form>
            </div>
        </div>
    );
}

export default CreateJob;