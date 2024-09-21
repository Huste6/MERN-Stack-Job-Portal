import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LastestJob = () => {
    const {allJobs} = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'>
                <span className='text-[#6A38C2]'>Latest & Top</span> Job Openings
            </h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {allJobs.length <=0 ? (
                    <span>Không có jobs nào</span>
                ) : (
                    allJobs.map((item,index) => <LatestJobCards onClick={()=>navigate(`/description/${item?._id}`)} key={index} job={item}/>
                ))}
            </div>
        </div>
    )
}

export default LastestJob