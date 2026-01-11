import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      return rejectWithValue("Failed to fetch users");
    }

    const data: User[] = await res.json();
    return data;
  } catch {
    return rejectWithValue("Network error");
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers(state) {
      state.users = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
