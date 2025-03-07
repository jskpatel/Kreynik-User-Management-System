import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  fname: string,
  lname: string,
  email: string,
  password: string,
  age: number,
  type: "admin" | "manager" | "employee"
}

interface InitialState {
  loading: boolean,
  user: User | null,
  allUsers: User[] | null,
  error: boolean | null,
  toast: string;
}

const initialState: InitialState = {
  loading: false,
  user: null,
  allUsers: null,
  error: null,
  toast: ""
}

export const createUser = createAsyncThunk(
  "user/create", async (payload: User) => {

    const response = await axios.post("/api/users", payload);
    return response.data
  }
)

export const getUser = createAsyncThunk(
  "user/get", async (payload: string) => {

    const response = await axios.get(`/api/users?email=${payload}`);
    return response.data
  }
)

export const getAllUser = createAsyncThunk(
  "user/getAll", async () => {

    const response = await axios.get<{data: User[]}>(`/api/users`);
    return response.data.data
  }
)

export const deleteUser = createAsyncThunk(
  "user/delete", async (email: string) => {

    const response = await axios.delete(`/api/users?email=${email}`);
    return response;
  }
)

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
    setAllUsers: (state, action) => {
      state.allUsers = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setToast: (state, action) => {
      state.toast = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.fulfilled, (state) => {
        state.toast = "User created successfully"
      })

      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(getAllUser.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.allUsers = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.toast = "User created successfully"
      })
  },
})

export const {setLoading, setUser, setAllUsers, setError, setToast} = userSlice.actions
export default userSlice.reducer
