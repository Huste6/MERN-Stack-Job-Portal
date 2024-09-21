import React, { useEffect } from 'react'
import Navbar from './share/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LastestJob from './LastestJob'
import Footer from './share/Footer'
import UseGetAllJobs from './hooks/UseGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchJobByQuery, setSingleJob } from './redux/jobSlice'

const Home = () => {
  UseGetAllJobs();
  const navigate = useNavigate();
  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(user?.role === 'recruiter'){
      navigate('/admin/companies');
    }
    dispatch(setSingleJob(null));
    dispatch(setSearchJobByQuery(''))
  },[])
  return (
    <div>
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LastestJob />
        <Footer />
    </div>
  )
}

export default Home;