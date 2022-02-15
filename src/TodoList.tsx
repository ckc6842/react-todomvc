import { FC, KeyboardEvent, useState } from "react"
import { Todo } from "./types"

const TodoList: FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [todoList, setTodoList] = useState<Todo[]>([])

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key !== 'Enter') return
    setTodoList([
      ...todoList,
      { name: inputValue, isCompleted: false } as Todo
    ])
    setInputValue('')
  }

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleEnter}
      />
    </>
  )
}

export default TodoList
