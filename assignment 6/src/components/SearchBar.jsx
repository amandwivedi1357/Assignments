import React, { useState, useEffect, useRef } from 'react';
import debounce from '../utils/debounce';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const debouncedSearch = useRef(
    debounce((value) => {
      if (value.trim()) {
        onSearch(value);
      }
    }, 500)
  ).current;
  
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

 
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto mb-6">
      <form onSubmit={handleSubmit} className="relative mb-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Search city..."
            className="w-full p-4 pl-12 pr-12 bg-night-secondary/50 text-white rounded-full border border-white/10 
              focus:border-glow-blue focus:outline-none focus:shadow-neon-blue glass 
              transition-all duration-300 placeholder:text-white/50"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
              />
            </svg>
          </div>
          <button 
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-glow-blue/20 p-2 rounded-full
              hover:bg-glow-blue/30 transition-all duration-300"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-5 h-5 text-white"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" 
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;