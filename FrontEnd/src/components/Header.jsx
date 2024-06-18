import { useEffect, useState } from "preact/hooks";
import React from "react";
import { CiKeyboard } from "react-icons/ci";
import { MdOutlineDescription } from "react-icons/md";
import { useDispatch } from "react-redux";
import { CreateTodo, FetchTodos } from "../../redux/TodoSlice";
import toast, { Toaster } from "react-hot-toast";
function Header() {
  const [Todotitle, setTodoTitle] = useState("");
  const [Tododesc, setTodoDesc] = useState("");
  const [Todostatus, setTodoStatus] = useState("0");
  const save = [Todotitle, Tododesc].every(Boolean);
  const dispatch = useDispatch();
  const AddTodo = async () => {
    const status = Boolean(Todostatus * 1);
    console.log(Todotitle, Tododesc, status);
    try {
      await dispatch(
        CreateTodo({
          Todos: Todotitle,
          Completed: status,
          Description: Tododesc,
        })
      ).unwrap();
      toast.success("Todo Created");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="flex gap-4 mt-5 relative">
      <Toaster />
      <div className="relative">
        <input
          type="text"
          name="todo"
          id="todo"
          onChange={(e) => setTodoTitle(e.target.value)}
          placeholder="Enter Task"
          className="bg-transparent border rounded-lg p-2 pl-10 outline-none text-slate-200"
        />
        <CiKeyboard
          size={21}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-200"
        />
      </div>
      <div className="relative">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Enter Description"
          onChange={(e) => setTodoDesc(e.target.value)}
          className="bg-transparent border rounded-lg p-2 pl-10 outline-none text-slate-200"
        />
        <MdOutlineDescription
          size={21}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-200"
        />
      </div>
      <div className="flex gap-2">
        <select
          name="select"
          id=""
          className="rounded-lg p-2 bg-blue-400 opacity-70"
          onChange={(e) => setTodoStatus(e.target.value)}
        >
          <option value="0">Pending</option>
          <option value="1">Done</option>
        </select>
        <button
          onClick={AddTodo}
          disabled={!save}
          className="bg-blue-500 bg-opacity-10 p-2 rounded-lg text-slate-200 hover:scale-105 transition-transform"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default Header;
