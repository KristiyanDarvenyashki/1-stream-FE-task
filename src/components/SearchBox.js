import React from "react";

const SearchBox = (props) => {
    return (
        <div className="searchBox">
            <input type="text" id="searchField" value={props.value} onChange={(e) => props.setMovieQuery(e.target.value)} placeholder='Search movies' />
            <div tabIndex="0" className="autocomplete-list">
                {props.movieSuggest.map((movie, index) => (
                    <div id={movie.id} key={index} onClick={(e) => props.handleMovieSelect(e.target.id)}>
                        {movie.title}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default SearchBox;