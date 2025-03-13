import React, { ReactNode } from 'react'
import Select from '../form/select/Select';
import { FaRotate } from 'react-icons/fa6';

interface ComponentCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  desc?: string;
  filter: boolean;
  filterProps: {
    onChange: (value: string) => void,
    option: {
      value: string,
      label: string,
    }[],
    onReset: () => void
  }
}

const ComponentCard:React.FC<ComponentCardProps> = ({title, children, className="", desc="", filter, filterProps}) => {

  const {option, onChange} = filterProps

  return (
    <div className={`rounded-2xl border border-gray-800 bg-white/[0.03] ${className}`}>

      {/* Card Header */}
      <div className="px-6 py-5 flex justify-between">
        <div className="flex flex-col justify-center">
          <h3 className="text-base font-medium text-white/90">{title}</h3>
          {desc ?
            <p className="mt-1 text-sm text-gray-400">{desc}</p>
          : null}
        </div>

        {filter ? 
          <div className="flex items-center">
            <label className='mr-3 text-white/50 whitespace-nowrap'>Filter :</label>
            <Select
              options={option}
              placeholder="Select Type"
              onChange={onChange}
              className="bg-dark-900 w-[250px] border-r-0"
            />
            <span
              onClick={filterProps.onReset}
              className='flex justify-center items-center w-[44px] min-w-[44px] h-[44px] bg-gray-800 rounded-lg rounded-tr-0 border border-gray-700 border-l-0'
            >
              <FaRotate />
            </span>
          </div>
        : null }

      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  )
}

export default ComponentCard