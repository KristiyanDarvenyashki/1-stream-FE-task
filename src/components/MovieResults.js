import React from "react";
import MovieCard from "./MovieCard";

const MovieResults = (props) => {
    return (
        props.movieRes.map((movie, index) => (
            <MovieCard movie={movie} index={index} handleDelete={props.handleDelete}/>
        ))
    )
};

export default MovieResults;