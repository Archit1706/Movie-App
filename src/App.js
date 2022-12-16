import React from 'react'
import Navbar from './components/Navbar'
import MovieCard from './components/MovieCard'

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <hr className="bg-gray-400 sm:mx-8 mx-2" />
      <MovieCard />
    </div>
  );
}

export default App
