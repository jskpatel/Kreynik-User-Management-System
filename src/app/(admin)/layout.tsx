'use client'

// import { useSidebar } from '@/context/SidebarContext'
import AppHeader from '@/layouts/AppHeader'
// import AppSidebar from '@/layouts/AppSidebar'
// import Backdrop from '@/layouts/Backdrop'
import React from 'react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout:React.FC<AdminLayoutProps> = ({children}) => {

  // const {isMobileOpen, isExpanded, isHovered} = useSidebar()

  // const mainContentMargin = isMobileOpen ? "ml-0" : isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex bg-gray-900">
      {/* <AppSidebar /> */}
      {/* <Backdrop /> */}

      {/* <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin} px-4`}> */}
      <div className={`flex-1 transition-all duration-300 ease-in-out px-4`}>
        <div className="py-4 mx-auto max-w-screen-2xl md:py-6">
          <AppHeader />
        </div>
        <div className="py-2 mx-auto max-w-screen-2xl md:py-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout