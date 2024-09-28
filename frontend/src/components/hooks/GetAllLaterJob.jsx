import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { JOB_LATER_API_END_POINT } from '../utils/constant';
import { setAllSaveForLater } from '../redux/SaveLaterJob';

const GetAllLaterJob = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllLaterJob = async () => {
            try {
                const res = await axios.get(`${JOB_LATER_API_END_POINT}/get`,{
                    withCredentials: true
                });
                if(res.data.success){
                    dispatch(setAllSaveForLater(res.data.getAllLaterJob))
                }
            } catch (error) {
                console.error(error);
            }
        } 
        fetchAllLaterJob();
    },[])
    return null;
}

export default GetAllLaterJob