import Checkbox from '@/components/form/checkbox/Checkbox'
import Pagination from '@/components/pagination/Pagination'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { UserDetails } from '@/lib/slices/LoginSlice'
import { getAllUser } from '@/lib/slices/UserSlice'
import { RootState } from '@/lib/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaBookOpenReader, FaPencil, FaTrashCan } from 'react-icons/fa6'
import { useSelector } from 'react-redux'

interface UserListProps {
  data: UserDetails[] | null
  onDelete: (email: string) => void
}

const UserList: React.FC<UserListProps> = ({ data, onDelete }) => {

  const dispatch = useAppDispatch()
  const {meta} = useSelector((state: RootState) => state.user)

  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [checkAll, setCheckAll] = useState<boolean>(false)


  const onPageChange = (page: number) => {
    dispatch(getAllUser({page}))
  }

  // Handle Single User Selected
  const handleCheck = (email: string, checked: boolean) => {
    setSelectedUsers(prev => {
      if(checked) {
        return [...prev, email]
      }else{
        return prev.filter(e => e !== email)
      }
    })
  }

  // Handle Check All Users
  const handleCheckAll = (checked: boolean) => {
    setCheckAll(checked)

    if(checked && data){
      setSelectedUsers(data.map(user => user.email))
    }else{
      setSelectedUsers([])
    }
  }

  useEffect(() => {
    if(!data) return

    setCheckAll(selectedUsers.length === data.length)
  }, [selectedUsers, data])

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[380px] md:min-w-[768px]">
            <table className="min-w-full">
              <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                <tr>
                  <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">
                    <Checkbox checked={checkAll} onChange={handleCheckAll} />
                  </th>
                  <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400"></th>
                  <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">Name</th>
                  <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">Email</th>
                  <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">Age</th>
                  <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">Type</th>
                  <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {
                  data !== null ? (
                    data.map((user: UserDetails, i: number) => {
                      return (<tr key={i}>
                        <td className="px-5 py-4 sm:px-6 text-start">
                          <Checkbox
                            checked={selectedUsers.includes(user.email)}
                            onChange={checked => handleCheck(user.email, checked)}
                          />
                        </td>
                        <td className="px-5 py-4 sm:px-6 text-start capitaliz">{i + 1}</td>
                        <td className="px-5 py-4 sm:px-6 text-start capitaliz">{user.fname} {user.lname}</td>
                        <td className="px-5 py-4 sm:px-6 text-start">{user.email}</td>
                        <td className="px-5 py-4 sm:px-6 text-start">{user.age}</td>
                        <td className="px-5 py-4 sm:px-6 text-start capitalize">{user.type}</td>
                        <td className="px-5 py-4 sm:px-6 text-start flex gap-3">
                          <Link href={`/dashboard/view/${user.email}`}><FaBookOpenReader /></Link>
                          <Link href={`/dashboard/edit/${user.email}`}><FaPencil /></Link>
                          <span onClick={() => onDelete(user.email)}><FaTrashCan /></span>
                        </td>
                      </tr>)
                    })
                  ) : (
                  <tr>
                    <td colSpan={6}><p className='text-center py-8'>Data not available</p></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <Pagination onPageChange={onPageChange} meta={meta} />
      </div>
    </>
  )
}

export default UserList