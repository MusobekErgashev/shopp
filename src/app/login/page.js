'use client'

import React from 'react'

const Page = () => {
    return (
        <div className='w-full h-screen bg-[#071952] fixed top-0 left-0 z-50 flex justify-center items-center'>
            <div className='w-100 h-max bg-white rounded-lg p-4 flex flex-col gap-4'>
                <h1 className='text-center text-2xl font-medium'>Login</h1>
                <form action="" className='flex flex-col gap-4'>
                    <input type="text" placeholder='Username' />
                    <input type="password" placeholder='Password' />
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Page