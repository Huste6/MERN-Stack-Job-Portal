import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAllCompanies } from '../redux/companySlice';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';

const GetAllCompany = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{
                    withCredentials: true
                });
                if(res.data.success){
                    dispatch(setAllCompanies(res.data.companies))
                }
            } catch (error) {
                console.error(error);
            }
        } 
        fetchAllCompany();
    },[])
    return null;
}

export default GetAllCompany;