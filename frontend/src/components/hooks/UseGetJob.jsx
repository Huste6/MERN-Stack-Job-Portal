import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { JOP_API_END_POINT } from '../utils/constant';
import { setSingleJob } from '../redux/jobSlice';
import axios from 'axios';

const UseGetJob = (jobId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchApiGetJob = async () => {
            try {
                const res = await axios.get(`${JOP_API_END_POINT}/getAdmin/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchApiGetJob();
    }, [jobId, dispatch]);
    return null;
}

export default UseGetJob;