import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";

interface Todo {
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleCompletion: (index: number) => void;
  removeTodo: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleCompletion,
  removeTodo,
}) => {
  return (
    <List>
      {todos.map((todo, index) => (
        <ListItem
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Checkbox
            checked={todo.completed}
            onChange={() => toggleCompletion(index)}
            color="primary"
          />
          <ListItemText
            primary={todo.text}
            sx={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          />
          <IconButton onClick={() => removeTodo(index)} edge="end">
            {/* <DeleteIcon /> */}
            <h2>DeleteIcon</h2>
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
