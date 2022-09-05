import { page } from 'web-init'
import { useEffect, useState } from 'react'

interface Todos {
  id: number;
  title: string;
  text: string;
  isCompleted: boolean;
}

export default page({
  url: '/todolist',
  component: ({}) => {
    const [todos, setTodos] = useState<Todos[]>([]);
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    useEffect(() => {
      fetch("/api/todos").then((res) => res.json()).then((data) => {
        setTodos(data.todos);
      });
    }, []);

    const handleAddTodo = () => {
      setTodos([...todos, {id: Date.now(), title, text, isCompleted: isCompleted}]);
      fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, text, isCompleted: isCompleted})
      })
      setTitle("");
      setText("");
      setIsCompleted(false);
    }
    const handleDeleteTodo = (id: number) => {
      setTodos(todos.filter(todo => todo.id !== id));
      fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      });
    }
    const handleChange = (id:number) => {
      const todo = todos.find(todo => todo.id === id);
      if (todo) {
        todo.isCompleted = !todo.isCompleted;
        const oldTodos = todos.filter(todo => todo.id !== id);
        setTodos([...oldTodos, todo]);
        fetch(`/api/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(todo)
        });
      }
    }

    return (
      <>
        <div className="min-w-full max-w-7xl bg-primary min-h-screen flex flex-col items-center">
          <div className="w-1/3 space-y-1">
            <div className="text-3xl text-white text-center">Todolist App</div>
            <input placeholder="Title" className="w-full rounded" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea placeholder="Todo Text" className="w-full rounded" value={text} onChange={(e) => setText(e.target.value)}/>
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddTodo}>Add
            </button>
          </div>
          <div className="max-w-7xl w-full grid-cols-4 grid gap-4 mt-12">
            {todos.sort((a, b) => a.id - b.id).map(todo => (
              <div className="bg-secondary px-4 pb-2 rounded divide-y" key={todo.id}>
                <div className="text-center text-2xl font-semibold py-2">
                  {todo.title}
                </div>
                <div className="text-justify py-2">
                  {todo.text}
                </div>
                <div className="flex justify-between pt-2">
                  <button onClick={()=>handleChange(todo.id)} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${todo.isCompleted ? "opacity-50" : ""}`} >{todo.isCompleted ? "Completed" : "Complete"}</button>
                  <button onClick={()=>handleDeleteTodo(todo.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  },
})