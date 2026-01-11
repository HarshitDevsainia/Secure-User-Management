import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

/* ===========================
   SIGN IN
=========================== */
export const signIn = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: string }
>("auth/signIn", async (data, { rejectWithValue }) => {
  try {    
    const res = await axios.post("https://reqres.in/api/login", data);
    return res.data.token;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        err.response?.data?.error || "Invalid credentials"
      );
    }
    return rejectWithValue("Network error");
  }
});

/* ===========================
   SIGN UP
=========================== */
export const signUp = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: string }
>("auth/signUp", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post("https://reqres.in/api/register", data);
    return res.data.token;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.error || "Signup failed");
    }
    return rejectWithValue("Network error");
  }
});

/* ===========================
   SLICE
=========================== */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- SIGN IN ---------- */
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })

      /* ---------- SIGN UP ---------- */
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Signup failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
