import axios from 'axios'
import React, { useEffect } from 'react'
import { JOP_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'

const UseGetAllJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOP_API_END_POINT}/get`,{
                    withCredentials: true
                });
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error(error);
            }
        } 
        fetchAllJobs();
    },[])
    return null;
}

export default UseGetAllJobs;