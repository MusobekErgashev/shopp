'use client'

import React from 'react'

const page = () => {
  const data = JSON.parse(localStorage.getItem("products"))
  console.log(data)
  return (
    <div>
      {data.map(item => (
        <div
          key={item.id}
          className='w-70 h-123 flex flex-col shadow-lg shadow-blue-200 rounded-lg'
        >
          <div className='w-full rounded-t-lg h-200 overflow-hidden'>
            <img src={item.image} className='w-full rounded-t-lg transition-all cursor-pointer ease-in duration-150 hover:scale-105 h-full object-cover' />
          </div>

          <div className='p-2 w-full h-full flex flex-col justify-between'>
            <div className='h-max rounded'>
              <h1 className='text-[18px] first-letter:capitalize wrap-break-word leading-7 text-[#006EDD] font-semibold'>{item.title}</h1>
              <p className='text-[14px] text-gray-600 leading-4 wrap-break-word'>{item.description}</p>
            </div>

            <div className='flex flex-col gap-2.5'>
              <div className='flex items-end justify-between'>
                <h2 className='text-[18px] font-medium text-blue-800'>${item.price}</h2>
                <p className='text-[14px] text-blue-600'>{item.likes || 0} likes</p>
              </div>

              <div className='flex gap-2'>
                <button onClick={() => addToCart(item)} className='rounded-md bg-[#006EDD] py-2 w-full text-white cursor-pointer'>Add to Cart</button>
           
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default page