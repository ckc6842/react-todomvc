import { ChangeEvent, FC, KeyboardEvent, useMemo, useState } from "react"
import TodoItem from "./TodoItem"
import { Filter, Todo } from "./types"

const TodoList: FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>(Filter.All)

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

  const displayTodoList = useMemo(() => {
    switch (filter) {
      case Filter.All:
        return todoList
      case Filter.Active:
        return todoList.filter((todo) => !todo.isCompleted)
      case Filter.Completed:
        return todoList.filter((todo) => todo.isCompleted)
    }
  }, [todoList, filter])
  
  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleEnter}
      />
      <ul>
        {displayTodoList.map((todoItem, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todoItem}
            onToggleIsCompleted={onToggleIsCompleted}
          />
        ))}
      </ul>
      <button onClick={() => setFilter(Filter.All)}>All</button>
      <button onClick={() => setFilter(Filter.Active)}>Active</button>
      <button onClick={() => setFilter(Filter.Completed)}>Completed</button>
    </>
  )
}

export default TodoList
