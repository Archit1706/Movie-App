import axios from "axios";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Logo from "../assets/logo.jpg";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            console.log("Enter pressed");

            axios
                .get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=1`
                )
                .then((res) => {
                    console.log(res.data.results);
                    setMovies(res.data.results);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="flex flex-row justify-between items-center h-16 w-full m-auto sm:p-8 p-2">
            {/* Logo */}
            <div className="shadow-lg">
                <img className="rounded-md" width={150} src={Logo} alt="logo" />
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
    );
};

export default Navbar;
