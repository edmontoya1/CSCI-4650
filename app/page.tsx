"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { TodoItem } from "./types";

export default function Home() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/todos");
        const todos: TodoItem[] = await res.json();

        setTodos(todos);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    fetchTodo();
  }, []);

  const addTodo = async (newTodo: string) => {
    setIsLoading(true);
    try {
      // Make a POST request to add the new Todo
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemDescription: newTodo }),
      });

      if (res.ok) {
        // If the Todo was added successfully, fetch the updated list of todos
        const updatedTodos: TodoItem[] = await res.json();
        setTodos(updatedTodos);
      } else {
        console.log("Error adding todo");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const toggleCompletion = async (todoId: string, completed: boolean) => {
    setIsLoading(true);
    try {
      // Toggle the completion status locally
      const updatedTodos = todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !completed } : todo
      );
      setTodos(updatedTodos);

      // Make an API request to update the completion status on the server
      const res = await fetch(`/api/${todoId}`, {
        method: "PUT", // Or PUT depending on your API design
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });

      if (!res.ok) {
        console.log("Error toggling completion status");
        // Revert the change locally if the request fails
        const revertedTodos = todos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(revertedTodos);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const removeTodo = async (todoId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/${todoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoId }),
      });
      if (res.ok) {
        setTodos(todos.filter((todo) => todo.id !== todoId));
      } else {
        console.log("Error removing todo");
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>

      <Paper sx={{ padding: "1rem" }}>
        <AddTodo addTodo={addTodo} />
        {!isLoading ? (
          <TodoList
            todos={todos}
            toggleCompletion={toggleCompletion}
            removeTodo={removeTodo}
          />
        ) : (
          <h2>Loading ...</h2>
        )}
      </Paper>
    </Container>
  );
}
