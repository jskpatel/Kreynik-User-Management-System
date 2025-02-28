import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string,
  fname: string,
  lname: string,
  email: string,
  password: string,
}

interface InitialState {
  loading: boolean,
  user: User | null,
  error: boolean | null
}

const initialState: InitialState = {
  loading: false,
  user: null,
  error: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {setLoading, setUser, setError} = userSlice.actions
export default userSlice.reducer
