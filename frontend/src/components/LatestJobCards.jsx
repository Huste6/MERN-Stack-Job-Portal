import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCards = ({job,onClick}) => {
    return (
        <div onClick={onClick} className='p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg my-2'>{job?.company?.name}</h1>
                <p className='text-lg text-gray-500'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} postion</Badge>
                <Badge className='text-red-500 font-bold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-purple-700 font-bold' variant="ghost">{job?.salary} triệu</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards