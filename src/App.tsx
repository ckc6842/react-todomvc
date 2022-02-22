import './App.css';
import TodoList from './TodoList';

function App() {
  return (
    <div className="relative shadow-lg mt-28 bg-white">
      <h1 className="absolute -top-20 w-full text-pink-200 text-7xl text-center">
        todos
      </h1>
      <TodoList />
    </div>
  );
}

export default App;
