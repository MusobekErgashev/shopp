'use client'

import { Menu } from '@headlessui/react'
import axios from 'axios'
import { ChevronDownIcon } from 'lucide-react'
import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "https://695cf4cb79f2f34749d6795e.mockapi.io/shopping/products"
const today = new Date().toDateString()

const page = () => {
  const success = () => {
    toast.success("Product has been added succesfully!", {
      position: "top-center"
    });
  };

  const warning = () => {
    toast.warn("Please, fill all the inputs !", {
      position: "top-center"
    });
  };

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState()

  function postData(e) {
    e.preventDefault()

    if (title && description && image && category && price) {
      axios.post(BASE_URL, {
        createdAt: today,
        title,
        description,
        image,
        category,
        price,
        likes: 0
      }).then(() => {
        success()
        setTitle("")
        setDescription("")
        setImage("")
        setCategory("")
        setPrice("")
      }).catch((err) => console.log(err))
    } else {
      warning()
    }
  }

  return (
    <div className='flex gap-6 items-center mt-8'>
      <ToastContainer />
      <div className='flex flex-col gap-6 py-10 px-8 rounded-md items-center bg-white shadow-2xl shadow-white/20'>
        <h1 className='text-[24px] font-medium text-[#006EDD]'>Dashboard | Add Product</h1>

        <form onSubmit={postData} className='flex flex-col gap-4 w-120'>
          <div className="w-full h-11 relative flex rounded-xl">
            <textarea
              maxLength={25}

              className="peer w-full bg-[white] h-full flex overflow-hidden py-2.5 resize-none outline-none px-3 text-[14px] text-[#0F172B] rounded-md border border-[#006EDD]"
              id="title"
              type="text"
              value={title}
              onChange={e =>
                setTitle(e.target.value)
              }
            />
            <label
              className={`absolute cursor-text ${title ? "" : "top-1/2"} translate-y-[-50%] bg-[white] left-3 px-1 peer-focus:top-0 peer-focus:left-3 font-light text-sm peer-focus:text-sm peer-focus:text-[#006EDD] peer-valid:left-3 peer-valid:text-sm text-[#006EDD] peer-valid:text-[#006EDD] duration-150`}
              htmlFor="title"
            >
              Title
            </label>
          </div>

          <div className="w-full min-h-11 relative flex rounded-xl">
            <textarea
              maxLength={100}

              className={`${description ? "h-21" : "h-11"} peer w-full resize-none transition-all bg-white outline-none py-2 focus:h-21 appearance-none px-3 text-[14px] text-[#0F172B] rounded-md border border-[#006EDD]`}
              id="description"
              value={description}
              onChange={e =>
                setDescription(e.target.value)
              }
            />
            <label
              className={`absolute cursor-text ${description ? "" : "top-1/2"} translate-y-[-50%] text-[#006EDD] bg-white left-3 px-1 peer-focus:top-0 peer-focus:left-3 font-light text-sm peer-focus:text-sm peer-focus:text-[#006EDD] peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#006EDD] duration-150`}
              htmlFor="description"
            >
              Description
            </label>
          </div>

          <div className="w-full h-11 relative flex rounded-xl">
            <input

              className="peer w-full bg-white outline-none px-3 text-[14px] text-[#0F172B] rounded-md border border-[#006EDD]"
              id="image"
              type="text"
              value={image}
              onChange={e =>
                setImage(e.target.value)
              }
            />
            <label
              className={`absolute cursor-text ${image ? "" : "top-1/2"} text-[#006EDD] translate-y-[-50%] bg-white left-3 px-1 peer-focus:top-0 peer-focus:left-3 font-light text-sm peer-focus:text-sm peer-focus:text-[#006EDD] peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#006EDD] duration-150`}
              htmlFor="image"
            >
              Image URL
            </label>
          </div>

          <Menu as="div" className="relative inline-block">
            <Menu.Button className={`inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-4 h-11 items-center border border-[#006EDD] cursor-pointer transition-all py-2 text-sm ${category ? "text-[#0F172B]" : "text-[#006EDD]"} outline-0 hover:bg-gray-50`}>
              {category || 'Select category'}
              <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
            </Menu.Button>

            <Menu.Items
              className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div>
                <Menu.Item>
                  {() => (
                    <button type="button" onClick={() => setCategory("Men's clothing")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {`Men's clothing`}
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <button type="button" onClick={() => setCategory("Women's clothing")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {`Women's clothing`}
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <button type="button" onClick={() => setCategory("Jevelery")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {`Jevelery`}
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <button type="button" onClick={() => setCategory("Electronics")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {`Electronics`}
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <button type="button" onClick={() => setCategory("Food")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {`Food`}
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>

          <div className="w-full h-11 relative flex rounded-xl">
            <input

              className="peer w-full bg-white outline-none px-3 text-[14px] text-[#0F172B] rounded-md border border-[#006EDD]"
              id="price"
              type="number"
              // value={price}
              onChange={e =>
                setPrice(e.target.value)
              }
            />
            <label
              className={`absolute cursor-text ${price ? "" : "top-1/2"} text-[#006EDD] translate-y-[-50%] bg-white left-3 px-1 peer-focus:top-0 peer-focus:left-3 font-light text-sm peer-focus:text-sm peer-focus:text-[#006EDD] peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#006EDD] duration-150`}
              htmlFor="price"
            >
              Price $
            </label>
          </div>

          <button className="w-full mt-5 justify-center h-11 items-center text-white cursor-pointer flex rounded-md bg-[#006EDD]">
            Add Product
          </button>
        </form>
      </div>

      <div className='flex w-full flex-col gap-2 items-center'>
        <h1 className='text-[20px] font-medium text-white text-center px-3 py-0.5 rounded-sm bg-white/10'>{`Your product's view 👇`}</h1>

        <div className='flex w-full gap-6 justify-center items-center'>
          <div
            className='w-60.5 h-120 flex blur-xs p-2 flex-col gap-1.5 bg-linear-to-tr from-white/25 opacity-60 rounded-lg'
          >
            <div className='w-full rounded-lg h-160 overflow-hidden'>
              <img src={"https://www.warmoven.in/cdn/shop/files/duel-delight-chocolate_-cake.jpg?v=1749833568&width=1080"} className='w-full rounded-t-lg transition-all ease-in duration-150 h-full object-cover' />
            </div>

            <div className='w-full h-full flex flex-col justify-between'>
              <div className='h-max rounded'>
                <h1 className='text-[18px] first-letter:capitalize wrap-break-word leading-7 text-white font-semibold'>25x25cm shokolad tort</h1>
                <p className='text-[14px] text-white/60 font-light leading-4 wrap-break-word'>{`Pushti va Malla rangli shokolad bilan qoplangan tug'ilgan kun to'rti`}</p>
              </div>

              <div className='flex flex-col gap-2.5'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-[18px] font-medium text-white'>$25</h2>
                  <p className='text-[12px] text-white py-1 px-2.5 bg-white/15 rounded-full'>#Food</p>
                </div>

                <button className='rounded-md bg-white/30 border-2 transition-all border-white/50 py-2 w-full text-white font-semibold'>Add to Cart</button>
              </div>
            </div>
          </div>

          <div
            className='w-60.5 h-120 flex p-2 flex-col gap-1.5 bg-linear-to-tr from-white/25 rounded-lg'
          >
            <div className='w-full rounded-lg h-160 overflow-hidden'>
              <img src={image || "https://blog.3bee.com/_next/image/?url=https%3A%2F%2Fapi-backend-assets.s3.eu-south-1.amazonaws.com%2Fprivate%2Ffiler_public%2Fb8%2F5c%2Fb85c004f-8f5d-4b6c-ab70-25051c3fb9ba%2F11496fd2-2abf-4037-8b09-9627a1e60a3c.jpg&w=3840&q=75"} className='w-full rounded-t-lg transition-all cursor-pointer ease-in duration-150 hover:scale-105 h-full object-cover' />
            </div>

            <div className='w-full h-full flex flex-col justify-between'>
              <div className='h-max rounded'>
                <h1 className='text-[18px] first-letter:capitalize wrap-break-word leading-7 text-white font-semibold'>{!title ? "Title here" : title}</h1>
                <p className='text-[14px] text-white/60 font-light leading-4 wrap-break-word'>{!description ? "Description here" : description}</p>
              </div>

              <div className='flex flex-col gap-2.5'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-[18px] font-medium text-white'>${price}</h2>
                  <p className='text-[12px] text-white py-1 px-2.5 bg-white/15 rounded-full'>#{!category ? "Category" : category}</p>
                </div>

                <button className='rounded-md bg-white/30 border-2 hover:bg-white/40 transition-all border-white/50 py-2 w-full text-white font-semibold cursor-pointer'>Add to Cart</button>
              </div>
            </div>
          </div>

          <div
            className='w-60.5 h-120 flex blur-xs p-2 flex-col gap-1.5 bg-linear-to-tr from-white/25 opacity-60 rounded-lg'
          >
            <div className='w-full rounded-lg h-160 overflow-hidden'>
              <img src={"https://api.idea.uz/storage/products/February2025/H6D2lV7hFNHW2vfvMFCk.png"} className='w-full rounded-t-lg transition-all ease-in duration-150 h-full object-cover' />
            </div>

            <div className='w-full h-full flex flex-col justify-between'>
              <div className='h-max rounded'>
                <h1 className='text-[18px] first-letter:capitalize wrap-break-word leading-7 text-white font-semibold'>Samsung s25ultra</h1>
                <p className='text-[14px] text-white/60 font-light leading-4 wrap-break-word'>512gb + 12gb LLA 97% yangi xolatda. Rangi oq</p>
              </div>

              <div className='flex flex-col gap-2.5'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-[18px] font-medium text-white'>$1200</h2>
                  <p className='text-[12px] text-white py-1 px-2.5 bg-white/15 rounded-full'>#Electronics</p>
                </div>

                <button className='rounded-md bg-white/30 border-2 transition-all border-white/50 py-2 w-full text-white font-semibold'>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page