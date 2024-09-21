import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { JOP_API_END_POINT } from '../utils/constant';
import { setAllJobs } from '../redux/jobSlice';

const UseGetAllJobsSearch = () => {
    const dispatch = useDispatch();
    const {searchJobByQuery} = useSelector(store => store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOP_API_END_POINT}/get?Key=title&Value=${searchJobByQuery}`,{
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

export default UseGetAllJobsSearch