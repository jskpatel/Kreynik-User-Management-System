import { AppDispatch } from "@/lib/store"
import { useDispatch } from "react-redux"

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>()
}