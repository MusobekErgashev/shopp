'use client'

import React, { useEffect } from 'react'
import useMyStore from '@/store/useMyStore'
import { toast, ToastContainer } from 'react-toastify'
import { Trash } from 'lucide-react'

const page = () => {
  const success = () => {
    toast.success("Added to cart succesfully !", {
      position: "top-right"
    });
  };

  const warning = () => {
    toast.error("Product has already in cart !", {
      position: "top-right"
    });
  };
  
  const deleteSucces = () => {
    toast.success("Product has deleted succesfully !", {
      position: "top-right"
    });
  };

  const { products, isLoading, fetchData, homeLabel, deleteFunc, deleteData } = useMyStore()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isLoading) return <div className='text-center text-white'>Loading…</div>
  if (!products.length) return <div className='text-center text-white text-2xl'>We have no products yet</div>

  function addToCart(item) {
    const storedProducts = localStorage.getItem("products")
    let products = storedProducts ? JSON.parse(storedProducts) : []
    const exists = products.find(product => product.id === item.id)
    if (!exists) {
      success()
      products.push(item)
      localStorage.setItem("products", JSON.stringify(products))
    } else {
      warning()
    }
  }

  function removeCard(id) {
    deleteSucces()
    deleteData(id)
    deleteFunc()
  } 

  const filteredData = homeLabel === "All" ? products : products.filter((item) => item.category === homeLabel)

  return (
    <div className='flex flex-col gap-4 w-full'>
      <ToastContainer />
      <h1 className='text-white text-[24px] font-medium'>{homeLabel === "All" ? "All Products" : homeLabel}</h1>

      <div className='grid grid-cols-[repeat(5,242px)] justify-between w-full gap-5'>
        {filteredData.map(item => (
          <div
            key={item.id}
            className='w-full h-120 flex p-2 flex-col gap-1.5 bg-linear-to-tr from-white/25 rounded-lg'
          >
            <div className='w-full rounded-lg h-160 overflow-hidden'>
              <img src={item.image} className='w-full rounded-t-lg transition-all cursor-pointer ease-in duration-150 hover:scale-105 h-full object-cover' />
            </div>

            <div className='w-full h-full flex flex-col justify-between'>
              <div className='h-max rounded'>
                <h1 className='text-[18px] first-letter:capitalize wrap-break-word leading-7 text-white font-semibold'>{item.title}</h1>
                <p className='text-[14px] text-white/60 font-light leading-4 wrap-break-word'>{item.description}</p>
              </div>

              <div className='flex flex-col gap-2.5'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-[18px] font-medium text-white'>${item.price}</h2>
                  <p className='text-[12px] text-white py-1 px-2.5 bg-white/15 rounded-full'>#{item.category}</p>
                </div>

                <div className='flex gap-2'>
                  <button onClick={() => addToCart(item)} className='rounded-md bg-white/30 border-2 hover:bg-white/40 transition-all border-white/50 py-2 w-full text-white font-semibold cursor-pointer'>Add to Cart</button>
                  <button onClick={() => removeCard(item.id)} className='rounded-md bg-red-500 border-2 px-2.5 transition-all border-white/50 py-2 w-max text-white font-semibold cursor-pointer'><Trash /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page