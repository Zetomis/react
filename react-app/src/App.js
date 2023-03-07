import React, { useState, useEffect } from 'react'

import './app.css'

const APIKEY = '7a205fd8'
const APIURL = `http://www.omdbapi.com/?apikey=${APIKEY}&`

const App = () => {
    const [input, setInput] = useState('')
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        getMovieData(input)
    }, [input])

    useEffect(() => {
        console.log(movieList)
    }, [movieList])

    const getMovieData = async (input) => {
        const response = await fetch(`${APIURL}s=${input}`)
        const data = await response.json()
        setMovieList(data.Search)
    }

    return (
        <div className='App'>
            <h1 className='App__heading'>Movie App</h1>
            <input className='App__input' placeholder='Enter movie name' onChange={(event) => {setInput(event.target.value)}}/>
            <Container data={movieList}/>
        </div>
    )
}

const Container = (props) => {
    if (props.data && props.data.length > 0) {
        return <div className='App__container'>
            {props.data.map((movie, index) => (
                <MovieCard poster={movie.Poster} title={movie.Title} type={movie.Type} key={index}/>
            ))}
        </div>
    } else {
        return <h1 className='App__notfound'>Movie not found</h1>
    }
}

const MovieCard = (props) => {
    return (<div className='movie__card'>
        <div className='movie__img'>
            <img src={props.poster} alt='Not found'/>
        </div>
        <div className='movie__data'>
            <h1 className='movie__title'>{props.title}</h1>
            <h4 className='movie__type'>{props.type}</h4>
        </div>
    </div>)
}

export default App