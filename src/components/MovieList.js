import React from "react";

const MovieList =  (props) => {
    return (
        props.movies.map((title, k) => (
            <ul>
              <li>
                <input type='checkbox' id={`movie-${k}`} defaultChecked key={k} />
                <label htmlFor={`movie-${k}`}>{title}</label>
              </li>
            </ul>
          ))
    )
};

export default MovieList;