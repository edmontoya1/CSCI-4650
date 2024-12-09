import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import { TodoItem } from "../types";

interface TodoListProps {
  todos: TodoItem[];
  toggleCompletion: (id: string, completed: boolean) => Promise<void>;
  removeTodo: (todoId: string) => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleCompletion,
  removeTodo,
}) => {
  const handleCompletion = (todo: TodoItem) => {
    console.log("handling completion of: ", todo);
    toggleCompletion(todo.id, todo.completed);
  };

  return (
    <List>
      {todos.length === 0 ? (
        <h2>No Todos...</h2>
      ) : (
        todos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Checkbox
              checked={todo.completed}
              onChange={() => handleCompletion(todo)}
              color="primary"
            />
            <ListItemText
              primary={todo.itemDescription}
              sx={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            />
            <IconButton onClick={() => removeTodo(todo.id)} edge="end">
              {/* <DeleteIcon /> */}
              <h2>DeleteIcon</h2>
            </IconButton>
          </ListItem>
        ))
      )}
    </List>
  );
};

export default TodoList;
