
'use client'

import { makeStore } from "@/lib/store"
import { Store } from "@reduxjs/toolkit"
import React, { ReactNode, useRef } from "react"
import { Provider } from "react-redux"

const StoreProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const storeRef = useRef<Store | null>(null)

  if(!storeRef.current){
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}> {children} </Provider>
}

export default StoreProvider