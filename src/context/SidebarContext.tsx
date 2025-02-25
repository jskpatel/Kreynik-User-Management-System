'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type SidebarContextType = {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  activeItem: string | null;
  openSubmenu: string | null;

  setIsHovered: (isHovered: boolean) => void;
  setActiveItem: (item: string | null) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  toggleSubmenu: (item: string) => void;
}

type SidebarProviderProps = {
  children: React.ReactNode
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)

  if(!context){
    throw new Error("useSidebar must be used within a SidebarProvider")
  }

  return context;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({children}) => {

  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile)
      if(!mobile)
        setIsMobileOpen(false)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleSidebar = () => {
    setIsExpanded(prev => !prev)
  }

  const toggleMobileSidebar = () => {
    setIsMobileOpen(prev => !prev)
  }

  const toggleSubmenu = (item: string) => {
    setOpenSubmenu(prev => prev === item ? null : item)
  }

  return (
    <SidebarContext.Provider
      value={{
        isExpanded: isMobile ? false : isExpanded,
        isMobileOpen,
        isHovered,
        activeItem,
        openSubmenu,
        toggleSidebar,
        toggleMobileSidebar,
        setIsHovered,
        setActiveItem,
        toggleSubmenu
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider