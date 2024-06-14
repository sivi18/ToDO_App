import { render } from "preact";
import { App } from "./app.jsx";
import "../src/output.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditTodo from "./components/EditTodo.jsx";
import { Provider } from "react-redux";
import store from "../redux/store.js";
import { FetchTodos } from "../redux/TodoSlice.js";
store.dispatch(FetchTodos());
const router = createBrowserRouter([
  {
    path: "/EditTodo/:id",
    element: <EditTodo />,
  },
  {
    path: "/",
    element: <App />,
  },
]);

render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>,
  document.getElementById("app")
);
