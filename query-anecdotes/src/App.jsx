import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAnecdotes,updateAnecdote  } from './request/requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useNotificationDispatch} from "./NotificationContext.jsx";

const App = () => {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes(),
    retry: 1
  })
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const anecdotes = result.data

  const dispatch = useNotificationDispatch()
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <span>anecdote service not available due to problems in server</span>
  }

  const handleVote = (anecdote) => {
    const content = anecdote.content
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1 })
    dispatch({ type: 'voted', content })
    setTimeout(() => {
      dispatch({type:null})
    }, 5000)
  }

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
