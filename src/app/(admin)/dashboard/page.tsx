'use client'

import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import BreadCrumb from '@/components/common/BreadCrumb'
import ComponentCard from '@/components/common/ComponentCard'
import UserList from './UserList'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { deleteUser, getAllUser, setUserFilter } from '@/lib/slices/UserSlice'
import { RootState } from '@/lib/store'
import { INITS, UserType } from '@/components/auth/constant'

const Dashboard: React.FC = () => {

  const dispatch = useAppDispatch();
  const {allUsers: users, meta, userFilter} = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(getAllUser({page: INITS.page, limit: INITS.limit}))
  }, [dispatch])


  const handleUserFilter = useCallback(() => {
    if(userFilter !== null && userFilter !== undefined) dispatch(getAllUser({page: meta.currentPage, limit: INITS.limit, filter: userFilter}))
  }, [dispatch, meta.currentPage, userFilter])

  useEffect(() => {
    handleUserFilter()
  }, [handleUserFilter])

  const handleDelete = (email: string) => {
    dispatch(deleteUser(email))
  }

  const handleSelect = useCallback((value: string) => {
    dispatch(setUserFilter(value))
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(setUserFilter(""))
    dispatch(getAllUser({page: INITS.page, limit: INITS.limit}))
  }, [dispatch]);

  const filterProps = {
    onChange: handleSelect,
    option: UserType,
    onReset: handleReset
  }

  return (
    <>
      <BreadCrumb pageTitle='Dashboard' />

      <div className='space-y-6'>
        <ComponentCard
          title='User List'
          desc={`There are ${meta.totalData} users listed here`}
          filter={true}
          filterProps={filterProps}
        >
          <UserList data={users} onDelete={handleDelete} />
        </ComponentCard>
      </div>
    </>
  )
}

export default Dashboard
