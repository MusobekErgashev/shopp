'use client'

import useMyStore from '@/store/useMyStore'
import { GalleryVerticalEndIcon, PersonStanding, Search, ShoppingBag, ShoppingCartIcon, UserRound } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Header = () => {
    const { setHomeLabel, setSearchInputValue } = useMyStore()
    const [openCategory, setOpenCategory] = useState(false)
    const [hoveCategory, setHoverCategory] = useState(false)
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        setSearchInputValue(inputValue)
    }, [inputValue, setSearchInputValue])

    const categoryVal = [
        "Men's clothing",
        "Women's clothing",
        "Jevelery",
        "Electronics",
        "Food"
    ]

    return (
        <div className='px-20 fixed top-0 left-0 z-50 w-full py-3 bg-linear-to-t from-indigo-500/25 backdrop-blur-3xl flex justify-between items-center'>
            <Link href={'/'} className='text-[22px] font-semibold text-white'>Shopp</Link>

            <div className='flex gap-2.5 relative'>
                <div
                    onMouseOver={() => {
                        setOpenCategory(true)
                    }}
                    onMouseLeave={() => {
                        setTimeout(() => {
                            !hoveCategory ? setOpenCategory(false) : setHoverCategory(true)
                        }, 400);
                    }}

                    className='flex items-center gap-1.5 bg-white/90 px-3 rounded-md cursor-pointer'>
                    <GalleryVerticalEndIcon className='text-[#071952] w-5' />
                    <p className='text-[#071952] text-[16px] font-medium'>Category</p>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className='flex items-center bg-white/10 border border-white/35 w-130 px-3 gap-2 rounded-md'>
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder='Search' className='w-full py-1.25 text-white border-r border-r-white/35 outline-0' />
                    <Search className='text-white cursor-pointer' />
                </form>

                <div
                    onMouseOver={() => {
                        openCategory ? setHoverCategory(true) : ""
                    }}
                    onMouseLeave={() => {
                        setTimeout(() => {
                            setHoverCategory(false)
                        }, 400);
                    }}

                    className='absolute top-full overflow-hidden h-9 rounded-b-md mt-3 left-0 w-full'>
                    <div className={`${openCategory || hoveCategory ? "translate-0" : "-translate-y-10"} transition-all ease-in-out rounded-b-md py-1.5 px-3 w-full bg-white/90 flex justify-between items-center`}>
                        <span onClick={() => setHomeLabel("All")} className='text-[#071952] cursor-pointer font-normal opacity-100 transition-all hover:opacity-80'>All</span>
                        {categoryVal.map((item) => (
                            <span key={item} onClick={() => setHomeLabel(item)} className='text-[#071952] cursor-pointer font-normal opacity-100 transition-all hover:opacity-80'>{item}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-5">
                <Link href={'/'} className='text-[16px] font-medium text-white'>All Products</Link>
                <Link href={'/dashboard'} className='text-[16px] font-medium text-white'>Dashboard</Link>
                <Link href={'/cart'} className='text-[16px] font-medium text-white'><ShoppingCartIcon /></Link>
                <Link href={'/profile'} className='text-[16px] font-medium text-white'><UserRound /></Link>
            </div>
        </div>
    )
}

export default Header