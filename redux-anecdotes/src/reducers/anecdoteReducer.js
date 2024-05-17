import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action){
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateList(state, action){
      const id = action.payload.id
      const changedAnecdote = action.payload
      return state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
      ).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateList } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const voteFor = content=> {
  return async dispatch => {
    const anecdoteToUpdate = await anecdoteService.getOne(content)
    const anecdoteUpdated = await anecdoteService.updateVote({...anecdoteToUpdate, votes:anecdoteToUpdate.votes+1})
    dispatch(updateList(anecdoteUpdated))
  }
}
export default anecdoteSlice.reducer