import { ChangeEvent, FC, KeyboardEvent, useState } from "react"
import TodoItem from "./TodoItem"
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

  const onToggleIsCompleted = (e: ChangeEvent, index: number) => {
    const item = todoList[index]
    setTodoList([
      ...todoList.slice(0, index),
      {...item, isCompleted: !item.isCompleted},
      ...todoList.slice(index + 1),
    ])
  }
  
  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleEnter}
      />
      <ul>
        {todoList.map((todoItem, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todoItem}
            onToggleIsCompleted={onToggleIsCompleted}
          />
        ))}
      </ul>
    </>
  )
}

export default TodoList
