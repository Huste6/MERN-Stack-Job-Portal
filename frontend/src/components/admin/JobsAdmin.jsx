import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchJobByText, setSingleJob } from '../redux/jobSlice';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Navbar from '../share/Navbar';
import JobsTable from './JobsTable';
import UseGetAllJobsAdmin from '../hooks/UseGetAllJobsAdmin';

const JobsAdmin = () => {
  const [inputSearch, setinputSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  UseGetAllJobsAdmin();

  useEffect(() => {
    dispatch(setSearchJobByText(inputSearch))
    dispatch(setSingleJob(null))
  }, [inputSearch])

  return (
    <div>
      <Navbar />

      <div className='max-w-4xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
          <Input
            className='focus:outline-none focus:border-none w-fit'
            placeholder='Filter by name'
            onChange={(e) => setinputSearch(e.target.value)}
          />
          <Button onClick={() => navigate('/admin/jobs/create')}>New Job</Button>
        </div>
      </div>
      <JobsTable />
    </div>
  )
}

export default JobsAdmin