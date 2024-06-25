import React, { useState, useEffect } from 'react'
import './Todo.css'
const Todo = () => {
    
    const[inputValue,setInputValue] = useState('');
    const[editMode,setEditMode] = useState(false);
    const[editId,setEditId] = useState(null);
    const[editValue,setEditValue] = useState('');

    const getData = () => {
        const storedTodos = localStorage.getItem('todos')
        if(storedTodos)    return JSON.parse(storedTodos)
        else return []
    }
    const [todos, setTodos] = useState(getData)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])


    const addTodo = () => {
        if(inputValue.trim()!== ''){
            const newTodo = {
                id: new Date().getTime(),
                text: inputValue,
            }

            setTodos([...todos,newTodo]);
            setInputValue('');
        }
    }
    const deleteTodo = (id) =>{
        const updateTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updateTodos);
    }
    const enterEditMode = (id,text) =>{
        setEditMode(true);
        setEditId(id);
        setEditValue(text);
    }
    const updateTodo = () =>{
        const updatedTodos = todos.map((todo) => {
            if(todo.id === editId){
                return{...todo,text:editValue};
            }
            return todo;
        });

        setTodos(updatedTodos);
        setEditMode(false);
        setEditId(null);
        setEditValue('');
    }
    const handleChange = (id) => {
        const newTodos = [...todos]
        newTodos.forEach((curTodo) => {
            if(curTodo.id === id) {
                curTodo.isCompleted = !curTodo.isCompleted
            }
        })
        updateTodo(newTodos)
    }
  return (
    <div className='todo-container'>
       <h2>ToDo List</h2>
       <input type='text' value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}/>

        {
            editMode ? (
                <div>
                    <input type='text' 
                    value={editValue} 
                    onChange={(e)=>setEditValue(e.target.value)}/>
                    <button onClick={updateTodo}>Update</button>
                </div>
            ):(
                <button onClick={addTodo}>Add</button>
            )
        }

       <ul>
        {todos.map((todo)=>(
            <li key={todo.id}>
                <span>
                {todo.text}
                </span>
               
                <div>
                <input 
                            type="checkbox" 
                            checked={todo.isCompleted}
                            onChange={() => handleChange(todo.id)}
                        />
                <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                <button onClick={()=>enterEditMode(todo.id)}>Edit</button>
                </div>            
            </li>
        ))}
       </ul>
    </div>
  )
}

export default Todo