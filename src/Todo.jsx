import React, { useState } from 'react'

const Todo = () => {
    const[inputValue,setInputValue] = useState('');

  return (
    <div className='todo-container'>
       <h2>ToDo List</h2>
       <input type='text' value={inputValue}
        onChange={(e)=>setInputValue(e.target.value)}/>
       <button>Add</button>
    </div>
  )
}

export default Todo