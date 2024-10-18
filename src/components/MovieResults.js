import React from "react";
import MovieCard from "./MovieCard";

const MovieResults = (props) => {
    return (
        <div className="movieCardContainer">
            {props.movieRes.map((movie, index) => (
                <MovieCard key={index} movie={movie} index={index} handleDelete={props.handleDelete}/>
            ))}
        </div>
    )
};

export default MovieResults;