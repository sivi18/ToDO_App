import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DeleteTodo, FetchTodos } from "../../redux/TodoSlice";
import { Toaster, toast } from "react-hot-toast";

function TodoTemplate({ todo }) {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await dispatch(DeleteTodo({ _id: id })).unwrap();
      toast.success("Todo Deleted");
      dispatch(FetchTodos());
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete Todo");
    }
  };

  return (
    <>
      <Toaster />
      <tr className="border-b-4 hover:scale-105 transition-transform">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
          <h1
            className={`${
              todo.completed
                ? "text-green-400 text-xl text-center line-through opacity-70"
                : "text-slate-200 text-xl text-center"
            }`}
          >
            {todo.todos}
          </h1>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
          <p className="text-slate-200 text-center text-lg">
            {todo.description}
          </p>
        </td>
        <td width={10} className="mt-1">
          <span>
            {todo.completed ? (
              <p className="text-black  bg-green-400 opacity-70 h-9 w-30 rounded-lg p-2 text-center">
                Completed
              </p>
            ) : (
              <p className="bg-slate-400 h-9 w-30 rounded-lg opacity-70 p-2 text-white text-center">
                Pending
              </p>
            )}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
          <Link
            to={`/EditTodo/${todo._id}`}
            className="flex items-center text-center justify-center"
          >
            <CiEdit color="white" size={25} className="" />
          </Link>
        </td>
        <td className="font-medium flex items-center text-center justify-center mt-4">
          <button onClick={() => handleDelete(todo._id)}>
            <MdDelete
              color="white"
              size={25}
              className="bg-red-600 rounded-lg hover:bg-red-500"
            />
          </button>
        </td>
      </tr>
    </>
  );
}

export default TodoTemplate;
