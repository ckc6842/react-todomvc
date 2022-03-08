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

  const onEditTodoName = (name: string, index: number) => {
    const item = todoList[index]
    setTodoList([
      ...todoList.slice(0, index),
      {...item, name },
      ...todoList.slice(index + 1),
    ])
  }

  const clearCompleted = () => {
    setTodoList(todoList.filter((todo) => !todo.isCompleted))
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

  const remainTodoCount = useMemo(() => {
    return todoList.filter((todo) => !todo.isCompleted).length
  }, [todoList])
  
  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleEnter}
        className="shadow-md p-4 w-full"
        placeholder="What needs to be done?"
      />
      <ul className="m-0 p-0">
        {displayTodoList.map((todoItem, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todoItem}
            onToggleIsCompleted={onToggleIsCompleted}
            onEditTodoName={onEditTodoName}
          />
        ))}
      </ul>
      <footer className="text-sm grid grid-cols-3 p-1">
        <div className="flex items-center">{remainTodoCount} items left</div>
        <div className="flex justify-center">
          <div
            onClick={() => setFilter(Filter.All)}
            className={`cursor-pointer p-1 rounded border ${filter === Filter.All ? 'border-gray-300' : 'border-white'}`}
          >
            All
          </div>
          <div
            onClick={() => setFilter(Filter.Active)}
            className={`cursor-pointer p-1 rounded border ${filter === Filter.Active ? 'border-gray-300' : 'border-white'}`}
          >
            Active
          </div>
          <div
            onClick={() => setFilter(Filter.Completed)}
            className={`cursor-pointer p-1 rounded border ${filter === Filter.Completed ? 'border-gray-300' : 'border-white'}`}
          >
            Completed
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div onClick={() => clearCompleted()} className="cursor-pointer">Clear completed</div>
        </div>
      </footer>
    </>
  )
}

export default TodoList
