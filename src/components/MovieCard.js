import React from "react";

const MovieCard = (props) => {
    return (
        <div className="movieCard">
                <img src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} alt={props.movie.title}/>
                <div className="movieInfo">
                    <h3>{props.movie.title}</h3>
                    <p>{props.movie.overview}</p>
                </div>
                <span id={props.index} class="material-symbols-outlined" onClick={(e) => props.handleDelete(e.target.id)}>delete</span>
            </div>
    )
};

export default MovieCard;