import { useEffect, useState } from "react";
import "../css/todo.css";
import TodoItems from "./TodoItems";

type TodoType = {
  id: number;
  name: string;
  done: boolean;
};

export default function Todo() {
  const [todo, setTodo] = useState<TodoType>({
    id: Date.now(),
    name: "",
    done: false,
  });
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo.name.trim()) {
      setTodos([...todos, { ...todo, id: Date.now() }]);
      setTodo({ id: Date.now(), name: "", done: false });
    }
  };

  return (
    <div className="top">
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          onChange={(event) => setTodo({ ...todo, name: event.target.value })}
          placeholder="Add Todo"
          value={todo.name}
          type="text"
        />
        <button type="submit">
          <box-icon
            type="regular"
            name="add-to-queue"
            size="md"
            color="#ffffff"
          ></box-icon>
        </button>
      </form>
      {todos.map((item) => (
        <TodoItems
          key={item.id}
          item={item}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
}
