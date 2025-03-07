'use client'

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUser } from '@/lib/slices/UserSlice';
import { RootState } from '@/lib/store';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaAngleLeft } from "react-icons/fa6";
import Link from 'next/link';

const UserDetails = () => {
  const dispatch = useAppDispatch()

  const param = useParams();
  const email = decodeURIComponent(param.user as string)

  const { user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(getUser(email))
  }, [dispatch, email])

  return (
    <div className=''>
      <h4 className='bg-gray-700 py-5 px-3 text-center flex items-center'><Link href={"/dashboard"} className='pr-2'><FaAngleLeft /></Link> {user?.fname} {user?.lname}</h4>

      <ul className='bg-gray-800 p-4'>
        <li className='py-3'>Full Name: {user?.fname} {user?.lname}</li>
        <li className='py-3'>Email: {user?.email}</li>
        <li className='py-3 capitalize'>Type: {user?.type}</li>
        <li className='py-3'>Age: {user?.age}</li>
        {/* <li className='py-3'>Password: {user?.password}</li> */}
      </ul>
    </div>
  )
}

export default UserDetails