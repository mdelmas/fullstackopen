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

const modifyAnecdote = async (anecdote) => {
  const result = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return result.data
}

const services = { getAll, createAnecdote, modifyAnecdote }
export default services