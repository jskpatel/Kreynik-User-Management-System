'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Label from '@/components/form/label/Label'
import Button from '@/components/button/Button'
import Input from '@/components/form/input/Input'
import { SignUpFormFields, UserType } from './constant'
import Select from '../form/select/Select'

interface SignUpFormProps {
  formData: SignUpFormFields;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormFields>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ formData, setFormData }): React.ReactElement => {

  const [showPassword, setShowPassword] = useState(false)

  const handleSelectChange = (value: "admin" | "manager" | "employee") => {
    setFormData((prev: SignUpFormFields) => ({ ...prev, type: value }))
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <Label>
            First Name<span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="fname"
            name="fname"
            placeholder="Enter your first name"
            value={formData.fname}
            onChange={e => setFormData({ ...formData, fname: e.target.value })}
          />
        </div>
        <div className="sm:col-span-1">
          <Label>
            Last Name<span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            id="lname"
            name="lname"
            placeholder="Enter your last name"
            value={formData.lname}
            onChange={e => setFormData({ ...formData, lname: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label>
          User Type <span className="text-red-500">*</span>{" "}
        </Label>
        <Select
          options={UserType}
          placeholder="Select Type"
          onChange={handleSelectChange}
          className="bg-dark-900"
        />
      </div>


      <div>
        <Label>Email <span className="text-red-500">*</span></Label>
        <div className="relative">
          <Input
            placeholder="info@gmail.com"
            type="text"
            className="pl-[62px]"
            name="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <Image
              height={20}
              width={20}
              alt=''
              src={"../../images/envelopeIcon.svg"}
            />
          </span>
        </div>
      </div>

      <div>
        <Label>
          Password <span className="text-red-500">*</span>{" "}
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
          >
            {showPassword ? (
              <Image
                height={20}
                width={20}
                alt=''
                src={"../../images/eyeIcon.svg"}
              />
            ) : (
              <Image
                height={20}
                width={20}
                alt=''
                src={"../../images/eyeCloseIcon.svg"}
              />
            )}
          </span>
        </div>
      </div>

      {/* <div className="flex items-center gap-3">
        <Checkbox
          className="w-5 h-5"
          checked={isChecked}
          onChange={setIsChecked}
        />
        <p className="inline-block text-sm font-normal text-gray-500 dark:text-gray-400">
          By creating an account means you agree to the{" "}
          <span className="text-gray-800 dark:text-white/90">
            Terms and Conditions,
          </span>{" "}
          and our{" "}
          <span className="text-gray-800 dark:text-white">
            Privacy Policy
          </span>
        </p>
      </div> */}

      <div>
        <Button className="w-full mt-4" size="sm" variant="primary">
          Submit
        </Button>
      </div>
    </div>
  )
}

export default SignUpForm