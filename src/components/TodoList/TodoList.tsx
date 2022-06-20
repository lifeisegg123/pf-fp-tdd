import { Todo } from "src/interfaces";
import { TodoItem } from "../TodoItem";

interface TodoListProps {
  todos: Todo[];
  onCheck: (id: string) => () => void;
  onRemove: (id: string) => () => void;
}

export function TodoList({ todos, onCheck, onRemove }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onCheck={onCheck(todo.id)}
          onRemove={onRemove(todo.id)}
        />
      ))}
    </ul>
  );
}
