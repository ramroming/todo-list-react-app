import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid';
import { set, ref, getDatabase, onValue, remove, update } from 'firebase/database'
import './homepage.css'
import { FaCheck,FaPlus,FaEdit,FaTrash,FaSignOutAlt } from "react-icons/fa";
function Homepage() {

  const navigate = useNavigate()
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [tempTodoUid, setTempTodoUid] = useState('')
  const db = getDatabase()


  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([])
          const data = snapshot.val()
          if (data !== null) {
            Object.values(data).map((todo) => (
              setTodos((oldArray) => [...oldArray, todo])
            ))
          }
        })
      }
      //if the user is not signed-in take them to login page not to homepage page 
      else if (!user) {
        navigate('/')
      }
    })
  }, [navigate, db])

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch(error => { alert(error.message) })
  }

  // read

  // add
  const writeToDatabse = () => {
    const todoUid = uid() //create uid for the todo
    if (todo !== '') {
      set(ref(db, `/${auth.currentUser.uid}/${todoUid}`), {
        todo: todo,
        todoUid: todoUid //the id of the todo not the user
      })
    }

    setTodo('')
  }

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true)
    setTodo(todo.todo)
    setTempTodoUid(todo.todoUid)
  }

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempTodoUid}`), {
      todo: todo,
      tempTodoUid: tempTodoUid
    })
    setTodo('')
    setIsEdit(false)
  }
  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
  }

  return (
    <div className="home-page">
      <input type="text" value={todo}
        placeholder="Add todo..."
        className="add-edit-input"
        onChange={(e) => setTodo(e.target.value)} />
      <div className="todos">
        {
          todos.map((todo, index) => (
            <div key={index} className="todo">
              <h1>{todo.todo}</h1>
              <FaEdit className="edit-icon" onClick={() => handleUpdate(todo)}/>
              <FaTrash className="delete-icon" onClick={() => handleDelete(todo.todoUid)}/>
            </div>

          ))
        }
      </div>
      {isEdit ?
        <div>
          <FaCheck className="add-confirm-icon" onClick={handleEditConfirm}/>
        </div> :
        <div>
          <FaPlus onClick={writeToDatabse} className="add-confirm-icon"/>
        </div>
      }
      <FaSignOutAlt className="sign-out-icon"onClick={handleSignOut}/>
    </div>
  )
}

export default Homepage