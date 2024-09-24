import { notification } from 'antd';
import { OctagonAlert } from 'lucide-react';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null || user.role != 'recruiter') {
            navigate('/')
            notification.open({
                message: 'Bạn phải đăng nhập để xem nội dung này!',
                icon: <OctagonAlert className='mt-3 text-red-600'/>,
                className: 'font-bold text-xl'
            })
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute