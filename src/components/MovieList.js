import React from "react";

const MovieList =  (props) => {
    return (
      <ul className="movieList">
        {props.movies.map((title, k) => (
            <li key={k}>
              <input type='checkbox' id={`movie-${k}`} name={title} onChange={(e) => props.handleSelect(e)} defaultChecked />
              <label htmlFor={`movie-${k}`}>{title}</label>
            </li>
          ))}
      </ul>
    )
};

export default MovieList;