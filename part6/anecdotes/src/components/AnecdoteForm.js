import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (event) => {
    console.log('create', event.target.anecdote.value)
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
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