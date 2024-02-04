import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './ToDoComp.css'
import axios from 'axios'

const TodoComp = () => {

    const BASE_URL = 'https://todos-mern-myu1.onrender.com/api'
    // const BASE_URL = 'http://localhost:5000/api'
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('')
    // for editing function
    const [editTodoID, setEditTodoID] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/todos`).then((res) => {
            
            setTodos(res.data); // Assuming the response contains the array of todos
        }).catch((error) => {
            console.error("Error fetching todos:", error);
        });
    }, [todos]);

    // posting the todo

    const postTodo = (e) =>{

        // if editTodoID is available then it will update that todo otherwise it will create new Todo
        e.preventDefault();
        const formData = {
            name:todo
            }

        if(editTodoID){
            axios.put(`${BASE_URL}/todos/${editTodoID}`, formData).then(() => {
                console.log(`Updated Todo with ID: ${editTodoID}`);
                setEditTodoID(null)
            }).catch((err) => {console.log(`Error: ${err.message}`)})

        }else{
            axios.post(`${BASE_URL}/todos/post`, formData)
            }

        setTodo('')
    }
    
    // deleting todo from database
    const deleteTodo = (e,todoId) => {
        e.preventDefault();
        axios.delete(`${BASE_URL}/todos/${todoId}`).then(() => {
            setTodo('');
            console.log(`Deted todo with ID: ${todoId}`);
        }).catch((error) => {
            console.log(`Error: ${error.message}`);
        })
    }

    // editing the todo 
    const editTodo = (e, todoId) => {
        e.preventDefault();
        setEditTodoID(todoId);

        const presentTodo = todos.find((item) => item._id === todoId)

        setTodo(presentTodo.name)

        
        
    }



  return (
    <div className='todoComp'>
        <h1>ToDo App</h1>
        <div className='main-container'>
            <form onSubmit={postTodo}>
                <div className='input'>
                    <input
                    type='text'
                    required
                    placeholder='Enter Your Todo..'
                    id='input'
                    name='input'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    />
                    
                </div>
                <button type='submit' className='btn' >
                        {
                             editTodoID ? "Update" : "Add"
                        }
                    </button>
            </form>

            <div className='showTodo-container'>
                <h2>My Todos </h2>
                <div className='todos'>
                    {
                        todos && todos.length > 0 ?
                        todos.map(todo => (
                            <div className='todo-container' key={todo._id}>
                                <p className='todo'>{todo.name}</p>
                                <div className="todo-icon">
                                    <EditIcon onClick = {(e) => editTodo(e,todo._id) } />
                                    <DeleteForeverIcon onClick = {(e) => deleteTodo(e,todo._id) } />
                                </div>
                            </div>
                        )) :
                        <h2>Todo list is Empty.</h2>
                    }
                </div>

            </div>
        </div>
    </div>
  )
}

export default TodoComp