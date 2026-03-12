'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import { ShoppingBagIcon, Heart, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-toastify'

const BASE_URL = 'https://shopp-backend-arrd.onrender.com/api/products'

const ProductDetails = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [favourites, setFavourites] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedFavs = localStorage.getItem("favourites")
      if (storedFavs) {
        return JSON.parse(storedFavs)
      }
    }
    return []
  })

  useEffect(() => {
    if (id) {
      axios.get(`${BASE_URL}/${id}`)
        .then(res => {
          setProduct(res.data)
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setLoading(false)
        })
    }
  }, [id])

  const successCart = () => {
    toast.success("Added to cart succesfully !", { position: "top-right" });
  };

  const warningCart = () => {
    toast.error("Product has already in cart !", { position: "top-right" });
  };

  const favouriteSuccess = (isAdded) => {
    if (isAdded) {
      toast.success("Added to favourites !", { position: "top-right" });
    } else {
      toast.info("Removed from favourites !", { position: "top-right" });
    }
  }

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

  function toggleFavourite(item) {
    const storedFavs = localStorage.getItem("favourites")
    let favs = storedFavs ? JSON.parse(storedFavs) : []
    const exists = favs.find(product => product.id === item.id)

    if (!exists) {
      favs.push(item)
      favouriteSuccess(true)
    } else {
      favs = favs.filter(product => product.id !== item.id)
      favouriteSuccess(false)
    }

    localStorage.setItem("favourites", JSON.stringify(favs))
    setFavourites(favs)
  }

  if (loading) return (
    <div role="status" className="flex justify-center items-center w-full mt-32">
      <svg aria-hidden="true" className="inline w-12 h-12 text-white/20 animate-spin fill-[#006EDD]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )

  setTimeout(() => {
    if (!product) return <div className='text-center text-white text-2xl'>We have no products yet</div>
  }, 1000);

  const isFavourite = favourites.some(fav => fav.id === product.id)

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  const imageSrc = isValidUrl(product.image) ? product.image : "https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-vector-information-icon-png-image_925431.jpg";

  return (
    <div className='flex flex-col w-full px-6 mt-6'>
      <Link href="/" className='flex items-center text-white/70 hover:text-white transition-colors mb-8 w-max'>
        <ChevronLeft size={24} />
        <span className='ml-1 text-lg'>Back to Products</span>
      </Link>

      <div className='flex gap-12 w-full max-w-6xl mx-auto'>
        <div className='w-1/2 relative h-[500px] rounded-xl overflow-hidden shadow-2xl shadow-blue-900/20'>
          <Image
            src={imageSrc}
            alt={product.title || 'Product image'}
            fill
            sizes="(max-width: 1200px) 50vw, 33vw"
            className='object-cover'
            unoptimized={!isValidUrl(product.image)}
          />
          <div
            onClick={() => toggleFavourite(product)}
            className='absolute top-4 right-4 cursor-pointer p-3 rounded-full bg-white/70 backdrop-blur-xs shadow-sm transition-all hover:bg-gray-300 hover:scale-105'
          >
            <Heart className={`size-7 transition-colors ${isFavourite ? 'fill-red-500 text-red-500' : 'text-gray-800'}`} />
          </div>
        </div>

        <div className='w-1/2 flex flex-col justify-between py-4'>
          <div>
            <div className='flex items-center gap-4 mb-4'>
              <span className='text-[14px] text-[#006EDD] py-1.5 px-4 bg-white rounded-full font-medium'>#{product.category}</span>
            </div>

            <h1 className='text-[42px] font-bold text-white leading-tight mb-6'>{product.title}</h1>

            <p className='text-[18px] text-white/70 font-light leading-relaxed mb-10'>
              {product.description}
            </p>
          </div>

          <div className='border-t border-white/20 pt-8'>
            <div className='flex items-center justify-between mb-8'>
              <span className='text-[20px] text-white/60 font-medium'>Price</span>
              <h2 className='text-[48px] font-bold text-white'>${product.price}</h2>
            </div>

            <button
              onClick={() => addToCart(product)}
              className='rounded-xl cursor-pointer flex items-center justify-center gap-3 bg-[#006EDD] hover:bg-[#005bb5] transition-all py-4 w-full text-white text-[20px] font-semibold shadow-lg shadow-[#006EDD]/30 hover:shadow-[#006EDD]/50'
            >
              <ShoppingBagIcon size={24} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Page = () => {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20 text-2xl">Loading...</div>}>
      <ProductDetails />
    </Suspense>
  )
}

export default Page