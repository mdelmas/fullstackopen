import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const createAnecdote = async (content) => {
  const anecdote = { content, votes: 0 }
  const result = await axios.post(baseUrl, anecdote)
  return result.data
}

export default { getAll, createAnecdote }