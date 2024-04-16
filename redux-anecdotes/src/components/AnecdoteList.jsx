import { useSelector, useDispatch } from "react-redux"
import {voteFor} from "../reducers/anecdoteReducer.js"

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))

    const vote = (id) => {
      dispatch(voteFor(id))
    }
    return(
        <div>
            <h2>Anecdotes</h2>
            {anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList