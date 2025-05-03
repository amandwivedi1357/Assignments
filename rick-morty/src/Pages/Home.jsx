import React, { useState, useEffect } from 'react';
import Charactercard from '../component/Charactercard';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        const data = await response.json();
        setCharacters(data.results.slice(0, 6)); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(1, prevPage - 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-12">
          Rick and Morty Characters
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mx-auto">
          {characters.map(character => (
            <Charactercard key={character.id} character={character} />
          ))}
        </div>
        
        <div className="flex justify-center space-x-4 mt-12">
          <button 
            onClick={handlePrevPage} 
            disabled={page === 1}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            onClick={handleNextPage}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;