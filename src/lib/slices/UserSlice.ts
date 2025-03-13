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

export interface Meta {
  currentPage: number,
  lastPage: number,
  totalPage: number,
  perPage: number,
  totalData: number
}
interface InitialState {
  loading: boolean,
  user: User | null,
  allUsers: User[] | null,
  error: string | null,
  toast: string;
  meta: Meta;
  userFilter: string
}

export const meta: Meta = {
  currentPage: 1,
  lastPage: 1,
  totalPage: 1,
  perPage: 5,
  totalData: 1
}
const initialState: InitialState = {
  loading: false,
  user: null,
  allUsers: null,
  error: null,
  toast: "",
  meta,
  userFilter: ""
}

interface Query {
  page?: number;
  limit?: number;
  email?: string;
  filter?: string | null;
}

export const createUser = createAsyncThunk(
  "user/create", async (payload: User) => {

    const response = await axios.post("/api/users", payload);
    return response.data
  }
)

export const getUser = createAsyncThunk(
  "user/get", async (email: string) => {

    const response = await axios.get(`/api/users?email=${email}`);
    return response.data.data
  }
)

export const getAllUser = createAsyncThunk(
  "user/getAll", async (payload: Query) => {

    const response = await axios.get<{ data: User[] }>(`/api/users?page=${payload.page}&limit=${payload.limit || meta.perPage}${payload.filter !== "" ? "&type="+payload.filter : ""}`);
    return response.data
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
    },
    setResetMeta: (state) => {
      state.meta = meta
    },
    setUserFilter: (state, action) => {
      state.userFilter = action.payload
    },
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

      .addCase(getAllUser.fulfilled, (state, action: PayloadAction<{data: User[]; meta: Meta}>) => {
        state.loading = false;
        state.allUsers = action.payload.data;
        state.meta = action.payload.meta
      })

      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.toast = "User created successfully"
      })
  },
})

export const { setLoading, setUser, setAllUsers, setError, setToast, setResetMeta, setUserFilter } = userSlice.actions
export default userSlice.reducer
