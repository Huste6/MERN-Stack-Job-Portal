import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { setSearchJobByQuery } from './redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSearchJob = (query) => {
        dispatch(setSearchJobByQuery(query));
        navigate('/brower')
    }
    return (
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-20'>
                <CarouselContent>
                    {category.map((item, index) => (
                        <CarouselItem className="md:basis-1/2 lg-basis-1/3" key={index}>
                            <Button onClick={() => handleSearchJob(item)} variant='outline' className='hover:bg-black hover:text-white'>{item}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel