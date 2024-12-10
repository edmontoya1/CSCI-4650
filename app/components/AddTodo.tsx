import { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Box } from "@mui/material";

interface AddTodoProps {
  addTodo: (newTodo: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo) {
      addTodo(newTodo);
      setNewTodo(""); // Reset input field
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      alignItems="center"
      gap={2}
    >
      <TextField
        label="New Todo"
        variant="outlined"
        value={newTodo}
        onChange={handleChange}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Add Todo
      </Button>
    </Box>
  );
};

export default AddTodo;
