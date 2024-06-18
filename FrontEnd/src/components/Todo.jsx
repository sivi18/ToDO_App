import React from "react";
import { useSelector } from "react-redux";
import { TodoStatus, selectAllTodos } from "../../redux/TodoSlice";
import TodoTemplate from "./TodoTemplate";

function Todo() {
  const allTodos = useSelector(selectAllTodos);
  const status = useSelector(TodoStatus);

  let content;

  if (status === "loading") {
    content = <p className="text-3xl text-white">Loading...</p>;
  } else if (status === "idle") {
    content = allTodos.map((todo) => (
      <TodoTemplate key={todo._id} todo={todo} />
    ));
  } else {
    content = <p className="text-3xl text-white">Error</p>;
  }

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle mt-5">
          <div className="border rounded-lg overflow-hidden dark:border-neutral-700 p-2">
            <table
              class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 p-2"
              width={800}
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-xl text-blue-500 opacity-85 text-center"
                  >
                    Todo
                  </th>
                  <th
                    scope="col"
                    className="text-xl text-blue-500 opacity-85 text-center"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="text-xl text-blue-500 opacity-85 text-center"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-xl text-blue-500 opacity-85 text-center"
                  >
                    Edit
                  </th>
                  <th
                    scope="col"
                    className="text-xl text-blue-500 opacity-85 text-center"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {content}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
