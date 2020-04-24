import React, { useContext } from 'React';
import { JokeContext } from '../contexts/JokeContext';

const Jokes = () => {
    const { jokes } = useContext(JokeContext);

    return (
        <div>
            <h2>Dad Jokes</h2>
            {jokes.map(joke => {
                return <div key={joke.id}>{joke.joke}</div>
            })}
        </div>
    )
}

export default Jokes;