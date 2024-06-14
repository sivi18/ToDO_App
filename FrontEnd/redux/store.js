import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./TodoSlice.js";

const store = configureStore({
  reducer: {
    todos: TodoSlice,
  },
});

export default store;
