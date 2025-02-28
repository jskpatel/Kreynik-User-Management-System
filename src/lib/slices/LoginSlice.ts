import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  email: string,
  password: string,
  loading: boolean,
}

const initialState: InitialState = {
  email: "",
  password: "",
  loading: false
}

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const {setLoading} = LoginSlice.actions;
export default LoginSlice.reducer;