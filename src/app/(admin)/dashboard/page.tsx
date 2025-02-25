import BreadCrumb from '@/components/common/BreadCrumb'
import React from 'react'
import ComponentCard from '@/components/common/ComponentCard'

const Dashboard: React.FC = () => {
  return (
    <>
      <BreadCrumb pageTitle='Dashboard' />

      <div className='space-y-6'>
        <ComponentCard title='Manager List'>
          Table
        </ComponentCard>
      </div>

      <div className='space-y-6 mt-6'>
        <ComponentCard title='Employee List'>
          Table
        </ComponentCard>
      </div>
    </>
  )
}

export default Dashboard