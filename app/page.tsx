"use client";

import { useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

// Define the Todo type
interface Todo {
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: string) => {
    setTodos([...todos, { text: newTodo, completed: false }]);
  };

  const toggleCompletion = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const removeTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>

      <Paper sx={{ padding: "1rem" }}>
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleCompletion={toggleCompletion}
          removeTodo={removeTodo}
        />
      </Paper>
    </Container>
  );
}
