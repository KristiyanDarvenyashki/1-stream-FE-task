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
  
  // State
  const [movies, setMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movieQuery, setMovieQuery] = useState('');
  const [movieSuggest, setMovieSuggest] = useState([]);
  const [movieResults, setMovieResults] = useState([]);
  const [addedFromSearch, setAddedFromSearch] = useState([]);
  const [language, setLanguage] = useState('en-US');
  const [searchBtn, setSearchBtn] = useState(false);

  const url = `https://api.themoviedb.org/3/search/movie?query=${movieQuery}&language=${language}`;
  const fetchedMovieData = [];

  //Fetch Movies
  // const fetchMovies = () => {   
  //   fetch(url, options)
  //   .then(response => response.json())
  //   .then(response => setMovies(response.results))
  //   .catch(err => console.error(err));
  // }

  //Fetch MovieSuggestions
  const fetchMovieSuggestions = () => {   
    fetch(url, options)
    .then(response => response.json())
    .then(response => setMovieSuggest(response.results))
    .catch(err => console.error(err));
  }

  //Fetch Movie By ID
  const fetchMovieByID = (id) => {
    const prev = [...addedFromSearch]

    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
    .then(response => response.json())
    .then(response => setAddedFromSearch([...prev,response]))
    .catch(err => console.error(err));
  }

  const getMovieData = (movieName) => {  
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&language=${language}`, options)
    .then(response => response.json())
    .then(response => fetchedMovieData.push(response.results[0]))
    .catch(err => console.error(err));
  
    console.log(fetchedMovieData);
  }

  const showSearch = () => (searchBtn ? <input type='submit' value='Search' onSubmit={handleSearch} /> : '')

  const handleFileUpload = (e) => {
    let reader = new FileReader();
    let uploadedFiles = e.target.files;
    let uploadedFile = uploadedFiles[0];

    reader.readAsText(uploadedFile);
    reader.onload = (e) => {
      readFile = reader.result.split('\r\n');
      console.log(readFile);
      setMovieList(readFile);
      setSearchBtn(true);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let movieSearch = [];
    const formData = new FormData(e.target);
    const data = formData.entries();
    for (const entry of data) movieSearch = [...movieSearch, entry[0]];

    console.log(movieSearch);
    movieSearch.map((movieName) => getMovieData(movieName));
    setMovies(fetchedMovieData);
  }

  const handleDelete = (e) => {
    let res = Array.from(movies);
    res.splice(e,1);
    setMovies(res);
  }

  const handleMovieSelect = (e) => {
    fetchMovieByID(e);
  }

  // useEffect(() => {
  //   fetchMovies();
  // }, [movieQuery])

  useEffect(() => {
    fetchMovieSuggestions();
  }, [movieQuery])

  return (
    <div className="App">
      <MovieListHeading heading='Movies' />
      <SearchBox movieQuery={movieQuery} setMovieQuery={setMovieQuery} movieSuggest={movieSuggest} handleMovieSelect={handleMovieSelect} />
      <form onSubmit={handleSearch}>
        <div className='movieListHolder'>    
          <input type="file" accept="text/txt" id="moviesTxt" onChange={handleFileUpload} />

          <MovieList movies={movieList} />

          {showSearch()}
        </div>
      </form>

      <div className='movieResults'>
        <MovieResults movieRes={movies} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;