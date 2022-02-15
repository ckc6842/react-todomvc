import { ChangeEvent, FC } from "react"
import { Todo } from "./types"

interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggleIsCompleted: (e: ChangeEvent, index: number) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, index, onToggleIsCompleted }: TodoItemProps) => {
  return (
    <li>
      <span>
        <input type="checkbox" checked={todo.isCompleted} onChange={(e) => onToggleIsCompleted(e, index)} />
      </span>
      <span>{todo.name}</span>
    </li>
  )
}

export default TodoItem
