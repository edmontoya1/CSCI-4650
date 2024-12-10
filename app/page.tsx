"use client";

import { Container, Typography, Paper } from "@mui/material";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

export default function Home() {
  const { todos, isLoading, addTodo, toggleCompletion, removeTodo } =
    useTodos();

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
