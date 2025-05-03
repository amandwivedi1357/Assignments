import React from 'react'
import { useNavigate } from 'react-router-dom';

const Charactercard = ({character}) => {
   const navigate = useNavigate();
   
   const handleClick = () => {
    navigate(`/character/${character.id}`);
   }

 
   const getStatusClass = () => {
     switch(character.status) {
       case 'Alive': return 'text-green-500';
       case 'Dead': return 'text-red-500';
       default: return 'text-gray-500';
     }
   }

   return (
    <div 
      className="cursor-pointer relative transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-700 hover:border-blue-600"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-black opacity-40 hover:opacity-20 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="h-64 overflow-hidden">
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        
        <div className="p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold tracking-wide text-blue-300 hover:text-blue-200 transition-colors">
              {character.name}
            </h2>
          </div>
          
          <div className="space-y-2 text-gray-300">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className={`${getStatusClass()} font-semibold`}>
                {character.status} - {character.species}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{character.location.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charactercard;