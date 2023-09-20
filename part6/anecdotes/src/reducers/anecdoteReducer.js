import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    // createAnecdote(state, action) {
    //   console.log('in createAnecdote reducer', JSON.parse(JSON.stringify(state)), action)
    //   return state.concat(action.payload)
    // },
    addAnecdote(state, action) {
      console.log('in createAnecdote reducer', JSON.parse(JSON.stringify(state)), action)
      return state.concat(action.payload)
    },
    modifyAnecdote(state, action) {
      console.log('in modifyAnecdote reducer', JSON.parse(JSON.stringify(state)), action)
      const changedAnecdote = action.payload
      return state.map(anecdote => anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote)
    },
    setAnecdotes(state, action) {
      console.log('in setAnecdotes reducer', JSON.parse(JSON.stringify(state)), action)
      return action.payload
    }
  }
})

export const { addAnecdote, modifyAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    console.log('createAnecdote', content)
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes

    const anecdoteToChange = anecdotes.find(anecdote => anecdote.id === id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    
    const newAnecdote = await anecdoteService.modifyAnecdote(changedAnecdote)
    dispatch(modifyAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
