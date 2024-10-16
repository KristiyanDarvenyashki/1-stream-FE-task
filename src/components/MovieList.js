import React from "react";

const MovieList =  (props) => {
    return (
      <ul className="movieList">
        {props.movies.map((title, k) => (
            <li>
              <input type='checkbox' id={`movie-${k}`} name={title} defaultChecked key={k} />
              <label htmlFor={`movie-${k}`}>{title}</label>
            </li>
          ))}
      </ul>
    )
};

export default MovieList;