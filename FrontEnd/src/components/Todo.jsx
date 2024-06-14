import { useSelector } from "react-redux";
import { TodoStatus, selectAllTodos } from "../../redux/TodoSlice";
import TodoTemplate from "./TodoTemplate";

function Todo() {
  const AllTodos = useSelector(selectAllTodos);

  const status = useSelector(TodoStatus);
  let content;
  if (status == "loading") {
    content = <p className="text-3xl text-white">Loading.</p>;
  } else if (status == "idle") {
    content = AllTodos?.map((todo) => (
      <TodoTemplate key={todo?._id} todo={todo} />
    ));
  } else {
    content = <p className="text-3xl text-white">Error</p>;
  }
  return <div>{content}</div>;
}

export default Todo;
