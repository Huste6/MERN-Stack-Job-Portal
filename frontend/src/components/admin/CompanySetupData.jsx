import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../share/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '../ui/toast';
import GetSingleCompanyByID from '../hooks/GetSingleCompanyByID';

const CompanySetupData = () => {
    const params = useParams();
    const companyId = params.id;
    GetSingleCompanyByID(companyId);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { singleCompany } = useSelector(store => store.company);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const formData = new FormData();
        if (data.file[0]) formData.append('file', data.file[0]);
        if (data.name) formData.append('name', data.name);
        if (data.description) formData.append('description', data.description);
        if (data.website) formData.append('website', data.website);
        if (data.location) formData.append('location', data.location);
        
        try {
            setLoading(true)
            const res = await axios.patch(`${COMPANY_API_END_POINT}/update/${companyId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

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
                navigate('/admin/companies')
            }
        } catch (error) {
            console.log(error);
            toast({
                title: error.response?.data?.message || "An error occurred",
                status: "error",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        } finally {
            setLoading(false)
        }
    };
    
    return (
        <div>
            <Navbar />

            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex items-center mb-5'>
                        <Button variant='outline' className='flex items-center gap-2'>
                            <ArrowLeft onClick={() => navigate('/admin/companies')} />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl ml-32'>Company Name</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label htmlFor="name">Company Name</Label>
                            <Input
                                type="text"
                                id="name"
                                defaultValue={singleCompany?.name}
                                {...register("name")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                type="text"
                                id="description"
                                defaultValue={singleCompany?.description}
                                {...register("description")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="website">Website</Label>
                            <Input
                                type="text"
                                id="website"
                                defaultValue={singleCompany?.website}
                                {...register("website")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                type="text"
                                id="location"
                                defaultValue={singleCompany?.location}
                                {...register("location")}
                            />
                        </div>
                        <div>
                            <Label htmlFor="file">Logo</Label>
                            <Input
                                type="file"
                                id="file"
                                accept="image/*"
                                {...register("file")}
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

export default CompanySetupData;