import React, {Component, useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieResults from './components/MovieResults';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

function App() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNDhhZDZiNjE5OWRlNTQ3MTdmYmYyOWIwODJlODhmNCIsIm5iZiI6MTcyODM5MzQ0MS41MjU0NDEsInN1YiI6IjY3MDRmYmIwNWMwMGEyZDQ0ZWMwMGUzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4PtH551ynLFq4zkUx6SVBaPe3BFK4ziB_dKdy7U88s4'
    }
  };

  let readFile = [];
  let fetchedMovieData = [];
  let movieSearch = [];
  
  // State
  const [movies, setMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movieQuery, setMovieQuery] = useState('');
  const [movieSuggest, setMovieSuggest] = useState([]);
  const [addedFromSearch, setAddedFromSearch] = useState([]);
  const [language, setLanguage] = useState('en-US');
  const [searchBtn, setSearchBtn] = useState(false);
  const [saveBtn, setSaveBtn] = useState(false);
  const [searchField, setSearchField] = useState(false);

  const url = `https://api.themoviedb.org/3/search/movie?query=${movieQuery}&language=${language}`;

  const showSearch = () => (searchBtn ? <input type='submit' value='Search' /> : '')
  const showSave = () => (saveBtn ? <input type='button' value='Save' onClick={sendMovies} /> : '')
  const showSearchField = () => (
    searchField ? <SearchBox movieQuery={movieQuery} setMovieQuery={setMovieQuery} movieSuggest={movieSuggest} handleMovieSelect={handleMovieSelect} /> : ''
  )

  //Fetch Movie Suggestions
  const fetchMovieSuggestions = () => {   
    fetch(url, options)
    .then(response => response.json())
    .then(response => setMovieSuggest(response.results))
    .catch(err => console.error(err));
  }

  //Fetch Movie By ID
  const fetchMovieByID = (id) => {
    const prev = [...addedFromSearch];

    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
    .then(response => response.json())
    .then(response => setAddedFromSearch([...prev,response]))
    .catch(err => console.error(err));
  }

  //Fetch Movie Data
  const getMovieData = (movieName) => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&language=${language}`, options)
    .then(response => response.json())
    .then(response => fetchedMovieData.push(response.results[0]))
    .catch(err => console.error(err));
  }

  //Send Movies
  const sendMovies = () => {
    const moviesFinal = [...movies, ...addedFromSearch];
    
    fetch('https://mydummyadress.com/movies', {
      method: 'POST',
      body: JSON.stringify(moviesFinal),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(alert('Successfully sent movie data!'));
  }

  //Handle File Upload
  const handleFileUpload = (e) => {
    setSearchField(false);
    setSaveBtn(false);
    let reader = new FileReader();
    let uploadedFiles = e.target.files;
    let uploadedFile = uploadedFiles[0];

    reader.readAsText(uploadedFile);
    reader.onload = (e) => {
      readFile = reader.result.split('\r\n');
      setMovieList(readFile);
      setSearchBtn(true);
    }
  }

  //Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formData.entries();
    for (const entry of data) movieSearch = [...movieSearch, entry[0]];

    movieSearch.map((title) => getMovieData(title));
    setTimeout(() => {
      setMovies(fetchedMovieData);
    }, 500);

    setSaveBtn(true);
    setSearchField(true);
  }

  //Handle Movie Delete From movies State
  const handleDelete = (e) => {
    let res = Array.from(movies);
    res.splice(e,1);
    setMovies(res);
  }

  //Handle Movie Delete From addedFromSearch State
  const handleDeleteFromSearch = (e) => {
    let res = Array.from(addedFromSearch);
    res.splice(e,1);
    setAddedFromSearch(res);
  }

  //Handle Movie Select
  const handleMovieSelect = (e) => {
    fetchMovieByID(e);
  }
  
  //Hide Search Button Based on saveBtn State Change
  useEffect(() => {
    setSearchBtn(false);
  }, [saveBtn])

  //Fetch Movie Suggestions Based on movieQuery State Change
  useEffect(() => {
    fetchMovieSuggestions();
  }, [movieQuery])

  return (
    <div className="App">
      <MovieListHeading heading='Movies' />
      {showSearchField()}
      <form onSubmit={handleSearch}>
        <div className='movieListHolder'>    
          <input type="file" accept="text/txt" id="moviesTxt" onChange={handleFileUpload} />
          <MovieList movies={movieList} />
          {showSearch()}
          {showSave()}
        </div>
      </form>
      <div className='movieResults'>
        <h4>Movie Results</h4>
        <MovieResults movieRes={movies} handleDelete={handleDelete} />
      </div>
      <div className='searchedMovies'>
        <h4>Searched Movies</h4>
        <MovieResults movieRes={addedFromSearch} handleDelete={handleDeleteFromSearch} />
      </div>
    </div>
  );
}

export default App;