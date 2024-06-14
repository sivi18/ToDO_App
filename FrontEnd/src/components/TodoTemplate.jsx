import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DeleteTodo, FetchTodos } from "../../redux/TodoSlice";
import { Toaster, toast } from "react-hot-toast";

function TodoTemplate({ todo }) {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(null);

  const handleDelete = async (id) => {
    try {
      await dispatch(DeleteTodo({ _id: id })).unwrap();
      toast.success("Todo Deleted");
      dispatch(FetchTodos());
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Todo");
    }
  };

  return (
    <div>
      <Toaster />
      {todo && (
        <div
          className={`${
            todo.completed
              ? "flex gap bg-green-400 backdrop-blur-sm backdrop-filter bg-opacity-10 p-2 mt-4 rounded w-[700px] justify-between items-center transition"
              : "flex gap bg-blue-600 backdrop-blur-sm backdrop-filter bg-opacity-10 p-2 mt-4 rounded w-[700px] justify-between items-center transition"
          }`}
          onClick={() => setClicked(clicked === todo._id ? null : todo._id)}
        >
          <div className="flex gap-4 flex-col transition-transform">
            <div className="flex gap-4">
              <h1
                className={`${
                  todo.completed ? "line-through decoration-green-300" : ""
                } p-2 text-2xl text-blue-500`}
              >
                {todo.todos}
              </h1>
            </div>
            {clicked === todo._id && (
              <p className="text-1xl ml-2 text-slate-200 ">
                {todo.description}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <Link to={`/EditTodo/${todo._id}`}>
              <CiEdit color="white" size={25} />
            </Link>
            <button onClick={() => handleDelete(todo._id)}>
              <MdDelete
                color="white"
                size={25}
                className="bg-red-600 rounded-lg"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoTemplate;
