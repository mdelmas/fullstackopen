import { useMutation, useQueryClient } from '@tanstack/react-query' 
import { createAnecdote } from '../requests'

import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))

      notificationDispatch({ type: 'DISPLAY', payload: `Created new anecdote : ${newAnecdote.content}`})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 4000);
    },
    onError: (error) => {
      notificationDispatch({ type: 'DISPLAY', payload: `Error when creating new anecdote: ${error}`})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 4000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      notificationDispatch({ type: 'DISPLAY', payload: `Anecdote should be at least 5 characters long`})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 4000);
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
