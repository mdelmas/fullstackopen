import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      console.log('in createAnecdote reducer', JSON.parse(JSON.stringify(state)), action)
      return state.concat(action.payload)
    },
    voteAnecdote(state, action) {
      console.log('in voteAnecdote reducer', JSON.parse(JSON.stringify(state)), action)

      const anecdoteToChange = state.find(anecdote => anecdote.id === action.payload)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      const changedState = state.map(anecdote => anecdote.id === action.payload ? changedAnecdote : anecdote)

      return changedState
    },
    setAnecdotes(state, action) {
      console.log('in setAnecdotes reducer', JSON.parse(JSON.stringify(state)), action)
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
