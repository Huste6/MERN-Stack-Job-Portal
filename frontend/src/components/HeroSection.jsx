import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchJobByQuery } from './redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSearchJob = () => {
        dispatch(setSearchJobByQuery(query));
        navigate('/brower')
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-300 text-[#F83002] font-medium hover:-translate-y-0.5 hover:transition-all'>No. 1 Job Portal Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Job</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus!</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input 
                        type='text'
                        placeholder='Nhập công việc cần tìm kiếm'
                        className='w-full focus:outline-none outline-none border-none'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button onClick={handleSearchJob} className='rounded-r-full bg-[#6A38C2]'>
                        <Search />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection