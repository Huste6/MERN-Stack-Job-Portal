import React, { useEffect } from 'react'
import Navbar from '../share/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllApplicants } from '../redux/applicantionSlice'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        console.log(res.data)
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job))
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllApplicants();
  }, [])
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applicants (3)</h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}

export default Applicants