import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import Logo from "../assets/logo.jpg";

const MovieCard = () => {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState({});
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState("");

    const apiKey = process.env.REACT_APP_API_KEY;

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            console.log("Enter pressed");

            axios
                .get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=1`
                )
                .then((res) => {
                    setMovies(res.data.results);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

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
    }, [movies]);

    const openMovieDetails = (movie) => {
        setMovie(movie);
        setModal(true);
        window.scrollTo(0,0)
    };

    const closeMovieDetails = () => {
        setModal(false);
    };

    return (
        <div className="">
            {/* navbar */}
            <div className="flex flex-row justify-between items-center h-16 w-full m-auto sm:p-8 p-2">
                {/* Logo */}
                <div className="shadow-lg">
                    <img
                        className="rounded-md w-[100px] sm:w-[150px]"
                        // width={150}
                        src={Logo}
                        alt="logo"
                    />
                </div>

                {/* Search Input */}
                <div className="flex flex-row justify-center items-center gap-4 border-gray-500 border-[1px] border-solid px-2 min-h-[30px]">
                    <FiSearch className="text-gray-400" />
                    <input
                        className="outline-none border-none bg-inherit text-gray-500"
                        type="text"
                        placeholder="Search for a movie"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleEnter}
                    />
                </div>
            </div>

            {/* horizontal line */}
            <hr className="bg-gray-400 sm:mx-8 mx-2" />

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
                    {search ? "Search Results" : "Most Recent Movies"}
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
            <div className="flex justify-center">
                <div
                    className={
                        modal
                            ? "absolute top-[16%] lg:left-1/4 w-[90%] sm:max-w-[600px] h-auto sm:h-[450px] border-2 border-solid shadow-lg z-20 bg-white"
                            : "hidden "
                    }
                >
                    <div className="flex flex-row justify-between p-2">
                        <p className="text-black font-semibold">
                            {movie.title}
                        </p>
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
                                movie.backdrop_path +
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
                                    {" / 10 (" +
                                        movie.vote_count +
                                        " total votes)"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MovieCard;
