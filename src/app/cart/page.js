'use client'

import { Heart, Trash } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const Page = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts)
      const initializedProducts = parsedProducts.map(p => ({
        ...p,
        quantity: p.quantity || 1
      }))
      setData(initializedProducts)
    }
  }, [])

  function updateLocalStorage(newData) {
    localStorage.setItem("products", JSON.stringify(newData))
  }

  function removeCard(item) {
    const newData = data.filter(product => product.id !== item.id)
    setData(newData)
    updateLocalStorage(newData)
  }

  function handleQuantityChange(id, delta) {
    const newData = data.map(item => {
      if (item.id === id) {
        const currentQty = item.quantity || 1
        let newQty = currentQty + delta
        if (newQty < 1) newQty = 1
        if (newQty > 10) newQty = 10
        return { ...item, quantity: newQty }
      }
      return item
    })
    setData(newData)
    updateLocalStorage(newData)
  }

  function clearCart() {
    setData([])
    localStorage.removeItem("products")
  }

  const totalPrice = data.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)

  return (
    <div className='flex flex-col mt-2 gap-4 w-full'>
      <h1 className='text-white flex gap-2 items-center text-[24px] font-medium'>Cart <p className='rounded-full flex justify-center items-center w-9 h-9 text-[18px] bg-white/40 '>{data.length}</p></h1>

      <div className='flex gap-10'>
        <div className='w-full flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {
            data.length ?
            data.map((item) => {
              const itemQuantity = item.quantity || 1;
              return (
                <div
                  key={item.id}
                  className='w-full min-h-60 flex p-2 gap-2 bg-linear-to-tr from-white/25 rounded-lg'
                >
                  <div className='w-60 relative rounded-lg overflow-hidden'>
                    <Image
                      src={item.image}
                      alt={item.title || 'Product image'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className='rounded-t-lg transition-all cursor-pointer ease-in duration-150 hover:scale-105 object-cover'
                    />
                  </div>

                  <div className='w-full p-3 h-full flex flex-col justify-between'>
                    <div className='h-max rounded'>
                      <h1 className='text-[22px] first-letter:capitalize wrap-break-word leading-7 text-white font-semibold'>{item.title}</h1>
                      <p className='text-[16px] text-white/60 max-w-140 font-light leading-4 wrap-break-word'>{item.description}</p>
                    </div>

                    <div className='flex flex-col gap-2.5'>
                      <div className='flex items-center justify-between'>
                        <h2 className='text-[22px] font-medium text-white'>${item.price}</h2>
                        <div className='flex items-center gap-2'>
                          <p className='text-[14px] text-white py-1 px-2.5 bg-white/15 rounded-full'>#{item.category}</p>
                          <h2 className='text-[22px] font-semibold text-white'>Total: ${item.price * itemQuantity}</h2>
                        </div>
                      </div>

                      <div className='flex gap-2 justify-between'>
                        <div className='flex items-center gap-2'>
                          <button onClick={() => handleQuantityChange(item.id, -1)} className='rounded-md bg-white/30 border-2 hover:bg-white/40 transition-all border-white/50 p-2 h-10 flex justify-center items-center w-10 text-white font-semibold cursor-pointer'>-</button>
                          <p className='text-[18px] text-white px-2.5  rounded-full'>{itemQuantity}</p>
                          <button onClick={() => handleQuantityChange(item.id, 1)} className='rounded-md bg-white/30 border-2 hover:bg-white/40 transition-all border-white/50 p-2 h-10 flex justify-center items-center w-10 text-white font-semibold cursor-pointer'>+</button>
                        </div>

                        <button onClick={() => removeCard(item)} className='rounded-md bg-red-500 border-2 px-2.5 transition-all border-white/50 py-2 w-max text-white font-semibold cursor-pointer'><Trash /></button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }) : <h1 className='text-white text-center text-2xl'>Cart is empty</h1>
          }
        </div>

        <div className='w-130 flex flex-col gap-5 h-max py-7 px-5 bg-linear-to-tr from-white/25 rounded-lg'>
          <h2 className='text-[22px] font-semibold text-white'>Orders: </h2>
          <div className='flex items-center justify-between'>
            <p className='text-[18px] text-white/70 font-light'>Products ({data.length}) </p>
            <p className='text-[18px] text-white'>${totalPrice}</p>
          </div>

          <h2 className='text-[24px] mt-8 font-semibold text-white'>Total: ${totalPrice}</h2>

          <div className='flex gap-2 flex-col'>
            <button onClick={clearCart} className='rounded-md border-2 hover:bg-red-600/90 transition-all border-red-600/90 p-2 h-12 flex justify-center items-center w-full text-red-500 hover:text-white font-semibold cursor-pointer'>Clear</button>
            <button className='rounded-md border-2 bg-white/40 hover:bg-white/30 transition-all border-white/50 p-2 h-12 flex justify-center items-center w-full text-white font-semibold cursor-pointer'>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page