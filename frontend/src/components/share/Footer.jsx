import React from 'react'

const Footer = () => {
    return (
        <footer className='px-8 bg-slate-600 text-white'>
            <div className='container mx-auto py-8'>
                <div className='flex flex-col items-center'>
                    <div className='border-b border-gray-400 pb-4 w-full text-center'>
                        <h2 className='text-2xl font-bold mb-2'>Job Portal</h2>
                        <p className='text-sm'>© 2024 NNQ. All rights reserved.</p>
                    </div>
                    <div className='flex space-x-6 mt-6'>
                        <a href="https://facebook.com" className='text-gray-400 hover:text-white transition duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" className='text-gray-400 hover:text-white transition duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" className='text-gray-400 hover:text-white transition duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect width="4" height="12" x="2" y="9" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer