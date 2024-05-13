import React, { useState } from "react";

type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [editText, setEditText] = useState(""); // Yangi state o'zgaruvchisi

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, isCompleted: false };
    setTodos([...todos, newTodo]);
    setTask("");
  };

  const completeTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Tahrirlash funktsiyasi
  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    setEditText(""); // Tahrirlashni tugatgandan so'ng, editTextni tozalash
  };

  return (
    <div className="container w-[700px] flex justify-center mx-auto rounded-lg h-[500px] mt-[50px]">
      <div className="todo items-center flex flex-col">
        <h1 className="font-bold text-5xl tracking-[10px] text-[#464646] mb-6">
          TODO LIST
        </h1>
        <div className="flex mt-[20px] gap-2">
          <input
            className="w-[300px] border border-slate-950 rounded"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={() => addTodo(task)}
            className="bg-indigo-600 rounded p-3 text-white font-bold hover:bg-indigo-600"
          >
            Add Task
          </button>
        </div>
        <ul className="bg-white w-[700px] flex flex-col items-center justify-center rounded-xl mt-[20px]">
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
              className="todods bg-slate-100 flex flex-col w-[500px] gap-6 p-[10px] rounded mt-[20px] mb-[15px]"
            >
              <div className="flex items-center w-[480px] justify-between">
                <div className="flex">
                  <button
                    onClick={() => completeTodo(todo.id)}
                    className="mr-[10px] bg-slate-500 text-white font-semibold p-1 rounded"
                  >
                    {todo.isCompleted ? "Undo" : "Complete"}
                  </button>
                </div>
                <div className="">
                  {todo.id === editText ? ( // Tekshirish, tahrirlash jarayonida bo'lsa
                    <div className="flex items-center">
                      <input
                        className="w-[300px] border border-slate-950 rounded"
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                      />
                      <button
                        onClick={() => editTodo(todo.id, task)}
                        className="bg-blue-500 hover:bg-blue-300 rounded p-1 text-white font-semibold ml-2"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="">{todo.text}</p>
                  )}
                </div>
                <div className="">
                  {todo.id === editText ? null : ( // Tahrirlash jarayonida Save tugmasini o'rnating
                    <button
                      onClick={() => setEditText(todo.id)}
                      className="ml-[10px] bg-blue-500 hover:bg-blue-300 rounded py-1 px-3 text-white font-semibold"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-[10px] bg-blue-500 hover:bg-blue-300 rounded p-1 text-white font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
