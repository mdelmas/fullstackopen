import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// export const getAll = () => axios.get(baseUrl).then(result => result.data)
export const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

export const createAnecdote = async (content) => {
  const result = await axios.post(baseUrl, { content, votes: 0 })
  return result.data
} 

export const modifyAnecdote = async (anecdote) => {
  const result = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return result.data
}