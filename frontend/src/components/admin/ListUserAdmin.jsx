import React, { useEffect, useState } from 'react'
import Navbar from '../share/Navbar'
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import TableUser from './TableUser';

const ListUserAdmin = () => {
    const [dataUser, setDataUser] = useState([]);
    const [dataUserAdmin, setDataUserAdmin] = useState([]);
    const fetchGetAllUser = async () => {
        const res = await axios.get(`${USER_API_END_POINT}/admin/listUserAdmin`, { withCredentials: true })
        if (res.data.success) {
            setDataUser(res.data.users);
            setDataUserAdmin(res.data.usersAdmin);
        }
    }
    useEffect(() => {
        fetchGetAllUser();
    }, [])
    return (
        <>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='mb-20'>
                    <h1 className='font-bold text-xl mb-10'>Danh sách tài khoản người dùng</h1>
                    <TableUser fetchGetAllUser={fetchGetAllUser()} data={dataUser} role={'student'} />
                </div>

                <div>
                    <h1 className='font-bold text-xl mb-10'>Danh sách tài khoản admin</h1>
                    <TableUser fetchGetAllUser={fetchGetAllUser()} data={dataUserAdmin} role={'recruiter'} />
                </div>
            </div>
        </>
    )
}

export default ListUserAdmin