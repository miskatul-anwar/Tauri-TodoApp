import "boxicons";
import React from "react";
import "../css/todoitems.css";

type TodoType = {
  id: number;
  name: string;
  done: boolean;
};

interface TodoItemsProps {
  item: TodoType;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

export default function TodoItems({ item, todos, setTodos }: TodoItemsProps) {
  const toggleDone = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === item.id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // Remove a todo item
  const handleDelete = () => {
    setTodos(todos.filter((todo) => todo.id !== item.id));
  };

  return (
    <div className={`todoitemlist ${item.done ? "completed" : ""}`}>
      <div onClick={toggleDone} style={{ flex: 1, cursor: "pointer" }}>
        {item.name}
      </div>
      <button onClick={handleDelete}>
        <box-icon name="trash" type="solid" color="#ffffff"></box-icon>
      </button>
    </div>
  );
}
