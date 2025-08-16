import React, {useState, useEffect} from 'react';
import {useDebounce} from "react-use";
import Search from "./components/search.jsx";
import Spinner from "./components/Spinner.jsx";
import {MovieCard} from "./components/MovieCard.jsx";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";
import {Query} from "appwrite";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const  API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}
const App = () => {
    const handleClick = () => {
        window.open('https://in.linkedin.com/in/sriram-nagandla', '_blank');
    };
    const handleClick2 = () => {
        window.open('https://www.linkedin.com/in/jagan-sunkavalli-870706331/', '_blank');
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    useDebounce(()=>setDebouncedSearchTerm(searchTerm), 500,[searchTerm]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const fetchMovies = async(query = '') => {
        try{
            setIsLoading(true);
            setErrorMessage('');

            const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            if(!response.ok){
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            if(data.Response == 'False'){
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);
                return;
            }
            setMovieList(data.results || []);
            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }
        }
        catch(err){
            console.log('Error fetching movies: ${err}');
            setErrorMessage('Error fetching movies, please try again');
        }
        finally {
            setIsLoading(false);
        }
    }
    const loadTrendingMovies = async()=> {
        try{
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
        }
        catch(err){
            console.log(`Error fetching trending movies: ${err}`);
        }
    }
    useEffect(() => {
        fetchMovies(debouncedSearchTerm);

    }, [debouncedSearchTerm]);
    useEffect(() => {
        loadTrendingMovies();
    },[]);
    return (
        <main className="pattern">
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient"> Movies</span> You'll Enjoy Without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </header>
                {
                    trendingMovies.length > 0 && (
                        <section className="trending">
                            <h2>Trending Movies</h2>
                            <ul>
                                {trendingMovies.map((movie,index) => (
                                    <li key={movie.$id}>
                                        <p>{index + 1}</p>
                                        <img src={movie.poster_url} alt={movie.title}/>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )
                }
                <section className="all-movies">
                    <h2>All Movies</h2>
                    {isLoading ? (
                        <Spinner/>
                    ): errorMessage?(
                        <p className="text-red-500">{errorMessage}</p>
                    ): (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </section>

            </div>
            <h1>{searchTerm}</h1>
            <section className="wrapper">
            {/*<div >*/}
                <h1  className="text-white">Built by <span onClick={handleClick} className="text-gradient">Sriram Nagandla</span> & <span onClick={handleClick2} className="text-gradient">Jagan Sunkavalli</span></h1>
                {/*</div>*/}

            </section>
        </main>
            )
}

export default App;