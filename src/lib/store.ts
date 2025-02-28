import { configureStore } from "@reduxjs/toolkit"
import loginReducer from "./slices/LoginSlice"
import userReducer from "./slices/UserSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      login: loginReducer,
      user: userReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]