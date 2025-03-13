import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface LoginPayload {
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
  user: LoginPayload,
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
  "auth/login", async (payload: LoginPayload, { rejectWithValue }) => {
    try {

      const response = await axios.post("/api/login", payload)
      // const response = await axios.post("/api/login", {email: "n@kreynik.com", password:"$2b$10$AIeMWcaGsW3bbVCbg8VpmOsU/OfUeSkYjOTqvg3eIyEdWfD3FW2fK"})

      return response.data

      // console.log("LOGIN RESPONSE >> ", response)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Network error")
    }
  }
)

// export const userLogin = createAsyncThunk(
//   "auth/login",
//   async ( payload: UserLoginPayload, {rejectWithValue} ) => {
//     try {
//       const response = await axios.post("/api/login",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload)
//         }
//       );

//       if(!response.ok){
//         const errorData = await response.json();
//         return rejectWithValue(errorData)
//       }

//       return response

//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       return rejectWithValue("Network error")
//     }
//   }
// )

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
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<LoginPayload>) => {
        state.user = action.payload
      })
  }
})

export const { setLoading, setError } = LoginSlice.actions;
export default LoginSlice.reducer;