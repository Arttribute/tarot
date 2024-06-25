import React from 'react'

export const Header = () => {
    return (
        <div className="absolute inset-x-0 top-0 flex h-16 flex-row items-center justify-between gap-10 bg-white p-5">
            <div className="ml-16 w-20 ">Logo</div>
            <div className="mr-10 "><button className='py-2 px-8 rounded-lg border-2 text-pink-500 font-semibold hover:bg-gray-200'>Connect Account</button></div>
        </div>
    )
}
