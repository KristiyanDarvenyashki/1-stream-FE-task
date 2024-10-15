import React from "react";

const SearchBox = (props) => {
    return (
        <div>
            <input type="text" value={props.value} onChange={(e) => props.setMovieQuery(e.target.value)} placeholder='Search movies' />
        </div>
    )
};

export default SearchBox;