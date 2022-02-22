import { ChangeEvent, FC } from "react"
import { Todo } from "./types"

interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggleIsCompleted: (e: ChangeEvent, index: number) => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, index, onToggleIsCompleted }: TodoItemProps) => {
  return (
    <li className="border-b">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={(e) => onToggleIsCompleted(e, index)}
          className="ml-2 w-8 h-8"
        />
        <label className="p-4">{todo.name}</label>
      </div>
    </li>
  )
}

export default TodoItem
