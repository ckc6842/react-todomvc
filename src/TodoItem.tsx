import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from "react"
import { Todo } from "./types"

interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggleIsCompleted: (e: ChangeEvent, index: number) => void;
  onEditTodoName: (name: string, index: number) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  todo,
  index,
  onToggleIsCompleted,
  onEditTodoName
}: TodoItemProps) => {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return
    const value = inputRef.current?.value
    onEditTodoName(value ?? todo.name, index)
    setIsEditting(false)
  }

  const openEditInput = () => {
    setIsEditting(true)
  }

  return (
    <li className="border-b">
      <div className="flex items-center" onDoubleClick={openEditInput}>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={(e) => onToggleIsCompleted(e, index)}
          className="ml-2 w-8 h-8"
        />
        {isEditting ? (
          <input
            type="text"
            ref={inputRef}
            onKeyDown={handleEnter}
            defaultValue={todo.name}
            className="m-1 p-3 shadow-inner"
          />
        ) : (
          <label className="p-4">{todo.name}</label>
        )}
      </div>
    </li>
  )
}

export default TodoItem
