'use client'

import { useSidebar } from '@/context/SidebarContext'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AppSidebar = () => {

  const {isMobileOpen, isExpanded, isHovered, setIsHovered} = useSidebar()


  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href={"/"}>
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo.svg"
                alt="Kreynik Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden block"
                src="/images/logo.svg"
                alt="Kreynik Logo"
                width={150}
                height={40}
              />
              </>
          ): (
            <Image
              src="/images/logo.svg"
              alt="Kreynik Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
    </aside>
  )
}

export default AppSidebar