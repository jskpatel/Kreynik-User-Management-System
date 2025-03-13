import React from 'react'

interface TableProps {
  head: string[];
  body: unknown[]
}

const Table: React.FC<TableProps> = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[380px] md:min-w-[768px]">
          <table className="min-w-full">
            <thead className="border-b border-gray-100 dark:border-white/[0.05]">
              <tr>
                <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">#</th>
                <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">#</th>
                <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">#</th>
                <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">#</th>
                <th className="px-5 py-3 font-medium text-start text-theme-xs text-gray-400">#</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              <tr>
                <td className="px-5 py-4 sm:px-6 text-start">#</td>
                <td className="px-5 py-4 sm:px-6 text-start">#</td>
                <td className="px-5 py-4 sm:px-6 text-start">#</td>
                <td className="px-5 py-4 sm:px-6 text-start">#</td>
                <td className="px-5 py-4 sm:px-6 text-start">#</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table