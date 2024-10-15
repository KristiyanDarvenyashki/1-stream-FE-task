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
  //const movieList = ReactDOM.createRoot(document.getElementById('movieList'));
  
  // State
  const [movies, setMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movieQuery, setMovieQuery] = useState('');
  const [movieResults, setMovieResults] = useState([]);
  const [language, setLanguage] = useState('en-US');
  //const [url, setUrl] = useState(`https://api.themoviedb.org/3/search/movie?query=${movieQuery}`);  //&language=${language}
  const [searchBtn, setSearchBtn] = useState(false);

  //Fetch Movies
  const fetchMovies = (setter, movieQuery) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieQuery}`;

    fetch(url, options)
    .then(response => response.json())
    .then(response => setter(response.results))
    .catch(err => console.error(err));
  }

  const showSearch = () => (searchBtn ? <input type='button' value='Search' onClick={handleSearch} /> : '')

  const handleChange = (e) => {
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

  const handleSearch = async () => {
    movieList.map((title) => {
      setMovieQuery(title);
    });
  }

  useEffect(() => {
    fetchMovies(setMovies, movieQuery);
  }, [movieQuery])

  return (
    <div className="App">
      <MovieListHeading heading='Movies' />
      <SearchBox movieQuery={movieQuery} setMovieQuery={setMovieQuery} />

      <MovieList movies={movieList} />

      <form>
        <input type="file" accept="text/txt" id="moviesTxt" name="movies" onChange={handleChange} />
      </form>
      
      <form>
        {showSearch()}
      </form>

      <MovieResults movieRes={movies} />
    </div>
  );
}

export default App;