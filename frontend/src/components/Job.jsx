import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_LATER_API_END_POINT } from './utils/constant'
import { message } from 'antd'
import GetAllLaterJob from './hooks/GetAllLaterJob'
import { useSelector } from 'react-redux'

const Job = ({ job }) => {
  const [save,setSave] = useState(false);
  const { AllSaveForLater } = useSelector(store => store.saveForLater);
  const navigate = useNavigate();
  const jobId = job?._id;

  const dateString = job?.createdAt;
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const now = new Date();
  const daynow = now.getUTCDate();

  const handleAddLaterJob = (jobId,companyId) => {
    try {
      const fetchApiPostLaterJob = async () => {
        const res = await axios.post(`${JOB_LATER_API_END_POINT}/post`,{
          jobId,
          companyId
        },{
          withCredentials: true
        })
        if(res.data.success){
          message.success(res.data.message);
          setSave(true);
          GetAllLaterJob();
        }
      }
      fetchApiPostLaterJob();
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message);
    }
  }

  useEffect(()=>{
    setSave(AllSaveForLater.some(item => item?.job?._id === jobId));
  },[]);

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          {daynow - day === 0 ? <span>Hôm nay</span> : `${daynow - day} ngày trước`}
        </p>
        {
          save ? (
            <Button className='rounded-full' variant='outline' size='icon'><BookmarkCheck /></Button>
          ) : (
            <Button className='rounded-full' variant='outline' size='icon'><Bookmark /></Button>
          )
        }
        
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button variant='outline' size='icon' className='p-6'>
          <Avatar>
            <AvatarImage src={job?.company?.logo} className='object-cover' alt={job?.company?.name} />
          </Avatar>
        </Button>
        <div>
          <h1 className='text-lg font-bold'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-400'>{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-500'>{job?.description}</p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} postion</Badge>
        <Badge className='text-red-500 font-bold' variant="ghost">{job?.jobType}</Badge>
        <Badge className='text-purple-700 font-bold' variant="ghost">{job?.salary} triệu</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button variant='outline' onClick={() => navigate(`/description/${jobId}`)}>Chi tiết</Button>
        {
          save ? (
            <></>
          ) : (
            <Button className='bg-[#7209b7] text-white' onClick={() => handleAddLaterJob(job?._id,job?.company?._id)}>Lưu xem sau</Button>
          ) 
        }
      </div>
    </div>
  )
}

export default Job