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
        console.log(updatedTodos);
        setTodos(updatedTodos);
      } else {
        console.log("Error adding todo");
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
