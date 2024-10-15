import React from "react";

const MovieResults = (props) => {
    return (
        props.movieRes.map((movie, index) => (
            <div>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                <h4>{movie.title}</h4>
                <p>{movie.overview}</p>
                <p>{`Actors: ${movie.actors}`}</p>
                <p>Genres: {movie.genres}</p>
                <p>Released: {movie.release}</p>
                <p>Rating: {movie.rating}</p>
                <p>Director: {movie.director}</p>
                <p>Duration: {movie.duration} </p>
                <button>Delete</button>
            </div>
        ))
    )
};

export default MovieResults;