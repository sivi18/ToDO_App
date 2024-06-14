import React, { useState, useEffect } from "react";
import { CiKeyboard } from "react-icons/ci";
import { MdOutlineDescription } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FetchTodos, UpdateTodo, selectTodoById } from "../../redux/TodoSlice";
import toast, { Toaster } from "react-hot-toast";

function EditTodo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const SelectedTodo = useSelector((state) => selectTodoById(state, id));
  const [updatetodo, SetUpdatetodo] = useState(SelectedTodo?.todos || "");
  const [updatedesc, SetUpdateDesc] = useState(SelectedTodo?.description || "");
  const [updatestatus, SetUpdateStatus] = useState(
    SelectedTodo?.completed ? "1" : "0"
  );
  const dispatch = useDispatch();

  const updateTodos = async (id) => {
    const status = Boolean(Number(updatestatus));
    try {
      await dispatch(
        UpdateTodo({
          _id: id,
          Todos: updatetodo,
          Completed: status,
          Description: updatedesc,
        })
      ).unwrap();
      toast.success("Todo Updated");
      navigate("/");
      dispatch(FetchTodos());
    } catch (error) {
      console.log(error);
    }
  };

  const CancelTodo = async () => {
    navigate("/");
  };

  useEffect(() => {
    if (SelectedTodo) {
      SetUpdatetodo(SelectedTodo.todos);
      SetUpdateDesc(SelectedTodo.description);
      SetUpdateStatus(SelectedTodo.completed ? "1" : "0");
    }
  }, [SelectedTodo]);

  return (
    <>
      <Toaster />
      <div className="bg-slate-800 flex flex-col items-center justify-center min-h-screen w-full gap-4">
        {SelectedTodo ? (
          <div className="border rounded-xl p-5 shadow-sm">
            <h1 className="text-4xl text-blue-500 text-center">Edit Todo</h1>
            <div className="flex flex-col items-center justify-center">
              <div className="flex gap-2 mt-5">
                <div className="relative">
                  <input
                    type="text"
                    name="todo"
                    value={updatetodo}
                    onChange={(e) => SetUpdatetodo(e.target.value)}
                    id="todo"
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
                    name="description"
                    value={updatedesc}
                    id="description"
                    onChange={(e) => SetUpdateDesc(e.target.value)}
                    placeholder="Enter Description"
                    className="bg-transparent border rounded-lg p-2 pl-10 outline-none text-slate-200"
                  />
                  <MdOutlineDescription
                    size={21}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-200"
                  />
                  <select
                    name="status"
                    id="status"
                    value={updatestatus}
                    className="rounded-lg ml-2 p-2 bg-blue-400 opacity-70"
                    onChange={(e) => SetUpdateStatus(e.target.value)}
                  >
                    <option value="0" className="opacity-70">
                      Pending
                    </option>
                    <option value="1" className="opacity-70">
                      Done
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                <button
                  className="p-2 rounded bg-red-600 text-slate-200 hover:text-red-600 hover:bg-slate-200"
                  onClick={CancelTodo}
                >
                  Cancel
                </button>
                <button
                  className="p-2 rounded bg-green-400 text-slate-200 hover:text-green-500 hover:bg-slate-200"
                  onClick={() => updateTodos(SelectedTodo._id)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default EditTodo;
