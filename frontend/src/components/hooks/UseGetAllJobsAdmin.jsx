import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { JOP_API_END_POINT } from '../utils/constant';
import { setAllAdminJob } from '../redux/jobSlice';

const UseGetAllJobsAdmin = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllJobsAdmin = async () => {
            try {
                const res = await axios.get(`${JOP_API_END_POINT}/getAdminJob`,{
                    withCredentials: true
                });
                if(res.data.success){
                    dispatch(setAllAdminJob(res.data.jobs));
                }
            } catch (error) {
                console.error(error);
            }
        } 
        fetchAllJobsAdmin();
    },[])
    return null;
}

export default UseGetAllJobsAdmin