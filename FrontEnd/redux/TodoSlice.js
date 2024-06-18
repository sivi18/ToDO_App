import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const todoAdapter = createEntityAdapter({
  selectId: (todo) => todo?._id || todo.updatedTodo._id,
  sortComparer: (a, b) => {
    const ADate = new Date(a.updatedAt || a.createdAt);
    const BDate = new Date(b.updatedAt || b.createdAt);
    return BDate - ADate;
  },
});
const initialState = todoAdapter.getInitialState({
  status: "idle",
});

const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchTodos.fulfilled, (state, action) => {
        todoAdapter.setAll(state, action.payload);
        state.status = "idle";
      })
      .addCase(FetchTodos.rejected, (state) => {
        state.status = "error";
      })
      .addCase(CreateTodo.fulfilled, (state, action) => {
        todoAdapter.addOne(state, action.payload);
      })
      .addCase(UpdateTodo.fulfilled, (state, action) => {
        todoAdapter.upsertOne(state, action.payload);
      })
      .addCase(DeleteTodo.fulfilled, (state, action) => {
        todoAdapter.removeOne(state, action.payload._id);
      });
  },
});

const baseURL = "http://127.0.0.1:5000/api";

export const FetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(`${baseURL}/todo`);
  return response.data.response;
});

export const CreateTodo = createAsyncThunk("todos/createTodo", async (todo) => {
  const response = await axios.post(`${baseURL}/todo`, todo);
  return response.data?.response;
});

export const UpdateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  const { _id } = todo;
  const response = await axios.put(`${baseURL}/todo/${_id}`, todo);
  return response?.data;
});

export const DeleteTodo = createAsyncThunk("todos/deleteTodo", async (todo) => {
  const { _id } = todo;
  const response = await axios.delete(`${baseURL}/todo/${_id}`);
  return _id;
});

export const {
  selectById: selectTodoById,
  selectIds: selectTodoIds,
  selectAll: selectAllTodos,
  selectTotal: selectTotalTodos,
} = todoAdapter.getSelectors((state) => state.todos);

export default TodoSlice.reducer;
export const TodoStatus = (state) => state.todos.status;
