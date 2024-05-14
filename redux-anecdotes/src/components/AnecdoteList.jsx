import { useSelector, useDispatch } from "react-redux"
import {voteFor} from "../reducers/anecdoteReducer.js"
import {notificationChange} from '../reducers/notificationReducer.js'
import Notification from './Notification'

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))

    const vote = (id, content) => {
      dispatch(voteFor(id))
      dispatch(notificationChange(`you voted for '${content}'`))
      setTimeout(() => {
        dispatch(notificationChange(null))
      }, 5000)
    }
    return(
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            {anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList