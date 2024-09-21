import React, { useEffect } from 'react'
import Navbar from './share/Navbar'
import Job from './Job';
import { useSelector } from 'react-redux';
import UseGetAllJobsSearch from './hooks/UseGetAllJobsSearch';
import { motion } from 'framer-motion';

const Browse = () => {
    UseGetAllJobsSearch();
    const { allJobs } = useSelector(store => store.job);
    return (
        <div>
            <Navbar />

            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold my-10 text-xl'>Kết quả tìm kiếm ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {allJobs.map((job, index) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                key={index}
                            >
                                <Job job={job} />
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Browse