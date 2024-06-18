import React from "react";
import Header from "./Header";
import Todo from "./Todo";

function Layout() {
  return (
    <div className="min-h-screen w-full bg-slate-800 flex flex-col items-center justify-center">
      <h1 className="text-4xl text-blue-400">Todos App</h1>
      <Header />
      <hr className="mt-4 h-[2px] w-[600px] bg-slate-400 rounded border-none mb-5" />
      <Todo />
    </div>
  );
}

export default Layout;
