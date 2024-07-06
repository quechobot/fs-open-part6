import { createAnecdote  } from '../request/requests'
import { useMutation, useQueryClient  } from '@tanstack/react-query'
import { useNotificationDispatch } from "../NotificationContext.jsx";

const AnecdoteForm = () => {
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
        },
    })
    const dispatch = useNotificationDispatch()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 },{
        onSuccess: ()=>{
            dispatch({ type: 'new', content })
            setTimeout(() => {
                dispatch({type:null})
            }, 5000)
        },
        onError: ()=>{
            dispatch({ type: 'short', content })
            setTimeout(() => {
                dispatch({type:null})
            }, 5000)
        }
    })

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
