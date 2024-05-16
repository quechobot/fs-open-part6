import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import anecdotes from "../services/anecdotes";

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
    voteFor(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const chnagedAnecdote = {...anecdoteToChange, votes : anecdoteToChange.votes+1}
      return state.map(anecdote =>
          anecdote.id !== id ? anecdote : chnagedAnecdote
      ).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteFor, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async dispatch =>{
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export default anecdoteSlice.reducer