import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaCircleUser } from "react-icons/fa6";

const AppHeader = () => {
  return (
    <div className='flex justify-between items-center'>
      <div className="logo">
        <Link href={"/"} className='flex gap-5 items-center'>
          <Image
            width={100}
            height={28}
            src="/images/logo.svg"
            alt='Kreynik User Management System'
          />
          Kreynik User Management System
        </Link>
      </div>

      <div className="flex items-center gap-2 text-[25px]">
        <FaCircleUser className='' />
        Admin
      </div>
    </div>
  )
}

export default AppHeader
