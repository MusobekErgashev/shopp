'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBagIcon } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'

const Page = () => {
  const [favourites, setFavourites] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedFavs = localStorage.getItem("favourites")
      if (storedFavs) {
        return JSON.parse(storedFavs)
      }
    }
    return []
  })

  const successCart = () => {
    toast.success("Added to cart succesfully !", { position: "top-right" });
  };

  const warningCart = () => {
    toast.error("Product has already in cart !", { position: "top-right" });
  };

  const removeSuccess = () => {
    toast.info("Removed from favourites !", { position: "top-right" });
  };

  function addToCart(item) {
    const storedProducts = localStorage.getItem("products")
    let products = storedProducts ? JSON.parse(storedProducts) : []
    const exists = products.find(product => product.id === item.id)
    if (!exists) {
      successCart()
      products.push(item)
      localStorage.setItem("products", JSON.stringify(products))
    } else {
      warningCart()
    }
  }

  function removeFromFavourites(id) {
    const newFavs = favourites.filter(item => item.id !== id)
    setFavourites(newFavs)
    localStorage.setItem("favourites", JSON.stringify(newFavs))
    removeSuccess()
  }

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  return (
    <div className='flex flex-col gap-4 w-full'>
      <h1 className='text-white flex gap-2 items-center text-[24px] font-medium'>Favourites <p className='rounded-full flex justify-center items-center w-9 h-9 text-[18px] bg-white/40 '>{favourites.length}</p></h1>

      {!favourites.length ? (
        <h1 className='text-white text-center text-2xl mt-10'>You have no favourite products yet</h1>
      ) : (
        <div className='grid grid-cols-[repeat(5,242px)] justify-between w-full gap-5'>
          {favourites.map(item => {
            const imageSrc = isValidUrl(item.image) ? item.image : "https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-information-icon-png-image_925431.jpg";
            return (
              <div
                key={item.id}
                className='w-full h-120 flex p-2 flex-col gap-1.5 bg-linear-to-tr from-white/25 rounded-lg'
              >
                <div className='w-full relative rounded-lg h-160 overflow-hidden'>
                  <Link href={`/details?id=${item.id}`}>
                    <Image 
                      src={imageSrc} 
                      alt={item.title || 'Product image'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className='rounded-t-lg transition-all cursor-pointer ease-in duration-150 hover:scale-105 object-cover'
                      unoptimized={!isValidUrl(item.image)}
                    />
                  </Link>
                <div 
                  onClick={() => removeFromFavourites(item.id)} 
                  className='absolute top-1.5 right-1.5 cursor-pointer p-1.5 rounded-full bg-white/70 backdrop-blur-xs shadow-sm transition-all hover:bg-gray-300'
                >
                  <Heart className='fill-red-500 text-red-500' />
                </div>
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

                  <button onClick={() => addToCart(item)} className='rounded-md flex items-center justify-center gap-2 bg-white/30 border-2 hover:bg-white/40 transition-all border-white/50 py-2 w-full text-white font-semibold cursor-pointer'><ShoppingBagIcon size={18} /> Add to Cart</button>
                </div>
              </div>
            </div>
          )})}
        </div>
      )}
    </div>
  )
}

export default Page