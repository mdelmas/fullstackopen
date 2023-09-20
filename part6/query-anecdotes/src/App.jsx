import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' 

import { getAll, modifyAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useNotificationDispatch } from './NotificationContext'


const App = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const modifyAnecdoteMutation = useMutation(modifyAnecdote, {
    onSuccess: (modifiedAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData(
        { queryKey: ['anecdotes'] }, 
        anecdotes.map(anecdote => anecdote.id === modifiedAnecdote.id ? modifiedAnecdote : anecdote)
      )

      notificationDispatch({ type: 'DISPLAY', payload: `Voted for anecdote : ${modifiedAnecdote.content}`})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 4000);
    },
    onError: (error) => {
      notificationDispatch({ type: 'DISPLAY', payload: `Error when voting for anecdote: ${error}`})
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 4000);
    }
  })

  const handleVote = (anecdote) => {
    const modifiedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    modifyAnecdoteMutation.mutate(modifiedAnecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return (<div>Loading...</div>)
  } else if (result.isError) {
    return (<div>Error loading anecdotes from server</div>)
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
