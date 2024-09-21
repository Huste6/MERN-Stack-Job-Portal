import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { AllCompanies = [],searchCompanyByText } = useSelector(store => store.company);
  const [ filterCompany,setFilterCompany ] = useState(AllCompanies);
  const navigate = useNavigate();
  useEffect(()=>{
    const filteredCompany = AllCompanies.length >=0 && AllCompanies.filter((company) => {
      if(!searchCompanyByText) return true
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany);
  },[AllCompanies,searchCompanyByText])
  return (
    <div className='max-w-6xl mx-auto my-10'>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length <= 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                Chưa có công ty nào đăng ký
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company, index) => {
              const date = new Date(company.createdAt).toISOString().split('T')[0];
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Button variant='outline' size='icon' className='p-6'>
                      <Avatar>
                        <AvatarImage src={company.logo} className='object-cover' alt={company.name} />
                      </Avatar>
                    </Button>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell className='cursor-pointer text-right'>
                    <Popover>
                      <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                      <PopoverContent className='w-20'>
                        <div onClick={()=>navigate(`/admin/companies/${company?._id}`)} className='flex items-center w-fit cursor-pointer gap-2'>
                          <Edit2 className='w-4' />
                          <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;