import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch("http://localhost:5000/posts/request");
  return await res.json();
});

export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const res = await fetch("http://localhost:5000/posts/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  return await res.json();
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await fetch(`http://localhost:5000/posts/request/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }) => {
    await fetch(`http://localhost:5000/posts/request/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return { id, ...data };
  }
);

// Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const idx = state.posts.findIndex((p) => p._id === action.payload.id);
        if (idx !== -1) state.posts[idx] = { ...state.posts[idx], ...action.payload };
      });
  },
});

export default postsSlice.reducer;
