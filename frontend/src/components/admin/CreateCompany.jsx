import React, { useState } from 'react'
import Navbar from '../share/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { toast } from '@/hooks/use-toast'
import { ToastAction } from '../ui/toast'
import { setSingleCompany } from '../redux/companySlice'

const CreateCompany = () => {
    const navigate = useNavigate();
    const [companyName,setCompanyName] = useState(null);
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast({
                    title: res.data.message,
                    status: "success",
                    action: (
                        <ToastAction altText="OK">
                            OK
                        </ToastAction>
                    ),
                });
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />

            <div className='max-w-5xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your company name</h1>
                    <p className='text-gray-400'>What would you like to give your company name? You can change later</p>
                </div>

                <Label>Company Name</Label>
                <Input 
                    type="text"
                    className='my-2'
                    placeholder='Google, Microsoft ...'
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant='outline' onClick={()=>navigate('/admin/companies')}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany