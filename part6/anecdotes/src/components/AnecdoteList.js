import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { displayNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes
      .filter(anecdote => anecdote.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))

    dispatch(displayNotification(`Voted for anecdote : ${anecdote.content}`, 4))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList