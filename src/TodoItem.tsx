import { FC } from "react"
import { Todo } from "./types"

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }: TodoItemProps) => {
  return (
    <li>
      <span>
        <input type="checkbox" checked={todo.isCompleted} />
      </span>
      <span>{todo.name}</span>
    </li>
  )
}

export default TodoItem
