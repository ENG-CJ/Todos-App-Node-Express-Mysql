import React from 'react'
import axios from "axios";
import { toast } from 'react-hot-toast';


export default function TodoList(props) {
  
  const update=(id,complete)=>{
    axios
      .put(`http://localhost:8900/todo/${id}`, {
        completed: `${complete}`,
      })
      .then((res) => {
        loadTodos()
        toast.success(res.data.message)
      })
      .catch((err) => console.log(err));
  }
  const Delete=(id)=>{
    axios
      .delete(`http://localhost:8900/todo/${id}`, {
        
      })
      .then((res) => {
        loadTodos()
        toast.success(res.data.message)
      })
      .catch((err) => console.log(err));
  }

  const loadTodos = () => {
    axios
      .get("http://localhost:8900/todo")
      .then((res) => props.setData(res.data.data))
      .catch((err) => console.log(err));
  };


  return (
    <>
     
      <div className="todo-list-container">
        {props.data &&
          props.data.map((value) => {
            return (
              <div className="todo">
                <label className={value.Complete == "true" ? "line" : ""}>
                  <input
                    onChange={(e) => update(value.ID, e.target.checked)}
                    type="checkbox"
                    name="Complete"
                    checked={value.Complete == "true" ? true : false}
                    className="check"
                  />
                  {value.Task}
                </label>
                <button className="delete" onClick={() => Delete(value.ID)}>
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
