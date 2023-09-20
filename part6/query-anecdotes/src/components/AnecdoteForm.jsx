import { useMutation, useQueryClient } from '@tanstack/react-query' 
import { createAnecdote } from '../requests'

import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const displayNotification = useNotification()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))

      displayNotification(`Created new anecdote : ${newAnecdote.content}`)
    },
    onError: (error) => {
      displayNotification(`Error when creating new anecdote: ${error}`)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      displayNotification(`Anecdote should be at least 5 characters long`)
    } else {
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate(content)  
    }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
