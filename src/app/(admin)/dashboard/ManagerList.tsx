import React from 'react'
import { FaPencil, FaTrashCan, FaBookOpenReader } from "react-icons/fa6";
import { UserDetails } from '@/lib/slices/LoginSlice';

interface ManagerListProps {
  data: UserDetails[]
  onDelete:(email: string) => void
}

const ManagerList: React.FC<ManagerListProps> = ({data, onDelete}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[380px] md:min-w-[768px]">
          <table className="min-w-full">
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">#</th>
                <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">Name</th>
                <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">Email</th>
                <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">Age</th>
                <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">Type</th>
                <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {
                data.map((user: UserDetails, i: number) => {
                  return (<tr key={i}>
                    <td className="px-5 py-4 sm:px-6 text-start">{i + 1}</td>
                    <td className="px-5 py-4 sm:px-6 text-start capitaliz">{user.fname} {user.lname}</td>
                    <td className="px-5 py-4 sm:px-6 text-start">{user.email}</td>
                    <td className="px-5 py-4 sm:px-6 text-start">{user.age}</td>
                    <td className="px-5 py-4 sm:px-6 text-start capitalize">{user.type}</td>
                    <td className="px-5 py-4 sm:px-6 text-start flex gap-3">
                      <span><FaBookOpenReader /></span>
                      <span><FaPencil /></span>
                      <span onClick={() => onDelete(user.email)}><FaTrashCan /></span>
                    </td>
                  </tr>)
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManagerList