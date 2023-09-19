import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (event) => {
    console.log('create', event.target.anecdote.value)
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))

    dispatch(displayNotification(`New anecdote created : ${event.target.anecdote.value}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)  

    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}> 
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm