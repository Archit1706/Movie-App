import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

const MovieCard = () => {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState({});
    const [modal, setModal] = useState(false);
    const apiKey = process.env.REACT_APP_API_KEY;

    const getMovies = () => {
        axios
            .get("https://api.themoviedb.org/3/movie/popular", {
                params: {
                    api_key: apiKey,
                    language: "en-US",
                },
            })
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getMovies();
    }, []);

    const openMovieDetails = (movie) => {
        console.log(movie);
        setMovie(movie);
        setModal(true);
        window.scrollTo(0,0)
    };

    const closeMovieDetails = () => {
        setModal(false);
    };

    return (
        <div className="">
            {/* black overlay when the movie details opens */}
            <div
                className={
                    modal
                        ? "fixed left-0 top-0 w-full h-screen bg-black/70 z-10"
                        : "hidden"
                }
            ></div>

            {/* movie cards */}
            <div className="">
                <h1 className="px-2 sm:px-8 text-xl font-bold my-4">
                    Most Recent Movies
                </h1>
                <div className="p-2 sm:px-8 flex flex-row flex-wrap gap-8 lg:justify-between justify-evenly">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            onClick={(event) => {
                                event.preventDefault();
                                console.log(event);
                                openMovieDetails(movie);
                            }}
                            className="w-[200px] md:h-[325px] md:w-[250px] bg-white rounded-md shadow-lg h-auto cursor-pointer hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        >
                            <p className="absolute m-4 rounded-full p-2 border-black border-2 border-solid bg-white">
                                {movie.vote_average}
                            </p>

                            <div className="w-full h-[85%]">
                                <img
                                    className="rounded-t-md fit-cover h-full w-full"
                                    src={
                                        "https://image.tmdb.org/t/p/w500/" +
                                        movie.poster_path +
                                        "?api_key=" +
                                        apiKey
                                    }
                                    alt={movie.title}
                                />
                            </div>

                            <p className="text-center my-auto font-bold">
                                {movie.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* movie details */}
            <div
                className={
                    modal
                        ? "absolute top-[16%] left-1/4 max-w-[600px] h-[450px] border-2 border-solid shadow-lg z-20 bg-white"
                        : "hidden "
                }
            >
                <div className="flex flex-row justify-between p-2">
                    <p className="text-black font-semibold">{movie.title}</p>
                    <button
                        onClick={closeMovieDetails}
                        className="text-black font-semibold"
                    >
                        <AiOutlineClose />
                    </button>
                </div>
                <div className="grid grid-cols-2 p-2">
                    <img
                        className="col-span-1 rounded-t-md fit-cover h-[90%]"
                        src={
                            "https://image.tmdb.org/t/p/w500/" +
                            movie.poster_path +
                            "?api_key=" +
                            apiKey
                        }
                        alt={movie.title}
                    />
                    <div className="col-span-1 p-2 flex flex-col justify-start gap-8">
                        <div>
                            <p className="text-black font-semibold inline">
                                Release Date
                            </p>
                            <span>: {movie.release_date}</span>
                        </div>

                        <div>
                            <p>{movie.overview}</p>
                        </div>

                        <div>
                            <p className="text-black font-semibold inline">
                                {movie.vote_average}
                            </p>
                            <span>
                                {" / 10 (" + movie.vote_count + " total votes)"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MovieCard;
