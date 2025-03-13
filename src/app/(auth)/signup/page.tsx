'use client'

import { SignUpFormFields, signUpFormFields } from '@/components/auth/constant'
import SignUpForm from '@/components/auth/SignUpForm'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { createUser } from '@/lib/slices/UserSlice'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const SignUp = () => {

  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<SignUpFormFields>(signUpFormFields)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser(formData))
  }


  return <div className="flex flex-col flex-1 lg:w-1/2 w-full">
    <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        {/* <ChevronLeftIcon /> */}
        <Image
          height={20}
          width={20}
          alt='Back'
          src={"../../images/chevronLeftIcon.svg"}
        />
        Back to Sign In
      </Link>
    </div>
    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
      <div>
        <div className="mb-5 sm:mb-8">
          <h1 className="text-4xl mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign Up
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email and password to sign up!
          </p>
        </div>
        <div className="mt-5 sm:mt-8">
          <form onSubmit={handleSubmit}>
            <SignUpForm formData={formData} setFormData={setFormData} />
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account? {""}
              <Link
                href="/signin"
                className="text-yellow-500 hover:text-yellow-600 dark:text-yellow-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default SignUp