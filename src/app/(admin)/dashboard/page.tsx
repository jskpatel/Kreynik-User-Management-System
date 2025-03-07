'use client'

import BreadCrumb from '@/components/common/BreadCrumb'
import React, { useEffect, useState } from 'react'
import ComponentCard from '@/components/common/ComponentCard'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { deleteUser, getAllUser } from '@/lib/slices/UserSlice'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { UserDetails } from '@/lib/slices/LoginSlice'

import AdminList from './AdminList'
import ManagerList from './ManagerList'
import EmployeeList from './EmployeeList'
import { UserTypes } from '@/components/auth/constant'

const Dashboard: React.FC = () => {

  const dispatch = useAppDispatch();
  const allUsers = useSelector((state: RootState) => state.user.allUsers)

  const [adminData, setAdminData] = useState<UserDetails[]>([]);
  const [managerData, setManagerData] = useState<UserDetails[]>([]);
  const [employeeData, setEmployeeData] = useState<UserDetails[]>([]);

  useEffect(() => {
    dispatch(getAllUser())
  }, [dispatch])

  useEffect(() => {
    if (Array.isArray(allUsers) && allUsers.length > 0) {
      const admins = allUsers?.filter(user => user.type === UserTypes.admin)
      const managers = allUsers?.filter(user => user.type === UserTypes.manager)
      const employees = allUsers?.filter(user => user.type === UserTypes.employee)
      setAdminData(admins)
      setManagerData(managers)
      setEmployeeData(employees)
    }
  }, [allUsers])

  const handleDelete = (email: string) => {
    dispatch(deleteUser(email))
  }

  return (
    <>
      <BreadCrumb pageTitle='Dashboard' />

      <div className='space-y-6'>
        <ComponentCard title='Admin List' count={adminData.length}>
          <AdminList data={adminData} onDelete={handleDelete} />
        </ComponentCard>
      </div>

      <div className='space-y-6 mt-6'>
        <ComponentCard title='Manager List' count={managerData.length}>
          <ManagerList data={managerData} onDelete={handleDelete} />
        </ComponentCard>
      </div>

      <div className='space-y-6 mt-6'>
        <ComponentCard title='Employee List' count={employeeData.length}>
          <EmployeeList data={employeeData} onDelete={handleDelete} />
        </ComponentCard>
      </div>
    </>
  )
}

export default Dashboard