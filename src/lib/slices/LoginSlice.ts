import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface UserDetails {
  email: string;
  password: string;
  age: number;
  fname: string;
  lname: string;
  type: string
}

export interface InitialState {
  user: UserLoginPayload,
  userDetails: UserDetails,
  loading: boolean,
  error: null
}

const initialState: InitialState = {
  user: {
    email: "",
    password: "",
  },
  userDetails: {
    email: "",
    password: "",
    age: 0,
    fname: "",
    lname: "",
    type: "",
  },
  loading: false,
  error: null
}


export const userLogin = createAsyncThunk(
  "auth/login",
  async ( payload: UserLoginPayload, {rejectWithValue} ) => {
    try {
      const response = await fetch("/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if(!response.ok){
        const errorData = await response.json();
        return rejectWithValue(errorData)
      }

      return response.json()
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Network error")
    }
  }
)

export const getUser = createAsyncThunk(
  "getUser", async (payload: string, {rejectWithValue}) => {
    try {
      const response = await fetch("/api/getUser", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });

      if(!response.ok){
        const errorData = await response.json();
        return rejectWithValue(errorData)
      }
      
      return response.json();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Network error")
    }
  }
)

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<UserLoginPayload>) => {
        state.user = action.payload
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.userDetails = action.payload
      })
  }
})

export const {setLoading, setError} = LoginSlice.actions;
export default LoginSlice.reducer;