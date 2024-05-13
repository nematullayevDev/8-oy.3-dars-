import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");

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

  return (
    <div className="container  w-[700px]  flex justify-center mx-auto rounded-lg h-[500px] mt-[50px]">
      <div className="todo items-center flex flex-col b">
        <div className="flex mt-[20px] ">
          {" "}
          <input
            className="w-[300px] border  border-slate-950 rounded "
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={() => addTodo(task)}
            className="bg-blue-500 rounded  p-3  text-white font-bold"
          >
            Add Task
          </button>
        </div>
        <ul className="bg-white w-[700px]  flex flex-col items-center justify-center rounded-xl  mt-[20px]">
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
              className="todods bg-slate-100 flex  flex-col w-[500px] gap-6 p-[10px] rounded mt-[20px] mb-[15px]"
            >
              <div className="flex items-center justify-center ">
                <button
                  onClick={() => completeTodo(todo.id)}
                  className="mr-[10px] bg-slate-500 text-white font-semibold p-1 rounded"
                >
                  {todo.isCompleted ? "Undo" : "Complete"}
                </button>

                <p> {todo.text}</p>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="ml-[10px] bg-blue-500 hover:bg-blue-300 rounded p-1 text-white font-semibold"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
