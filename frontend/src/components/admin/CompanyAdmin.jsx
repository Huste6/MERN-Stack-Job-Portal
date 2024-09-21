import React, { useEffect, useState } from 'react'
import Navbar from '../share/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import GetAllCompany from '../hooks/GetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText, setSingleCompany } from '../redux/companySlice'

const CompanyAdmin = () => {
  const [inputSearch, setinputSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(setSingleCompany(null))
  GetAllCompany();

  useEffect(() => {
    dispatch(setSearchCompanyByText(inputSearch))
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
          <Button onClick={() => navigate('/admin/companies/create')}>New Company</Button>
        </div>
      </div>
      <CompaniesTable />
    </div>
  )
}

export default CompanyAdmin