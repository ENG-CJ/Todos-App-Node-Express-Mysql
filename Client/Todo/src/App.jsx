import { useEffect, useState } from 'react';
import TodoList from './TodoList'
import data from './data.json'
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
function App() {
  const [todo,setTodo]=useState();
const [todoList,setTodoList]=useState();

const loadTodos=()=>{
   axios
     .get("http://localhost:8900/todo")
     .then((res) => setTodoList(res.data.data))
     .catch((err) => console.log(err));
}

useEffect(()=>{
  loadTodos();
},[])


  const addTodo=()=>{
  
    axios
      .post("http://localhost:8900/todo/new", {
        task: todo,
        complete: "false",
      })
      .then((res) => {
        console.log(res.data);
        loadTodos();
        setTodo("");
        toast.success(res.data.message, {
          duration: 3000,
        });
      })
      .catch((err) =>
     
        toast.error(err.response.data.err, {
          duration: 6000,
        })
      );
  }



  return (
    <>
      <Toaster position="top-center" />
      <div className="container">
        <div className="todo-input">
          <span>Add Todo</span>
          <div className="content">
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              type="text"
            />
            <button onClick={addTodo}>Save</button>
          </div>
        </div>
        <div className="todo-body">
          <TodoList data={todoList} setData={setTodoList}/>
        </div>
      </div>
    </>
  );
}

export default App
