import { useState, useEffect } from "react";
import { TodoItem } from "../types";

// Custom hook for fetching, adding, toggling, and removing todos
const useTodos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/todos");
      const todos: TodoItem[] = await res.json();
      setTodos(todos);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const addTodo = async (newTodo: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemDescription: newTodo }),
      });

      if (res.ok) {
        const updatedTodos: TodoItem[] = await res.json();
        setTodos(updatedTodos);
      } else {
        console.error("Error adding todo");
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const toggleCompletion = async (todoId: string, completed: boolean) => {
    setIsLoading(true);
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !completed } : todo
      );
      setTodos(updatedTodos);

      const res = await fetch(`/api/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });

      if (!res.ok) {
        console.error("Error toggling completion status");
        const revertedTodos = todos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(revertedTodos);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const removeTodo = async (todoId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/${todoId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoId }),
      });

      if (res.ok) {
        setTodos(todos.filter((todo) => todo.id !== todoId));
      } else {
        console.error("Error removing todo");
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, isLoading, addTodo, toggleCompletion, removeTodo };
};

export default useTodos;
