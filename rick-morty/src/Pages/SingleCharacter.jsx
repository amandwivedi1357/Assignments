import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleCharacter = () => {
    const { id } = useParams()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchCharacterDetails = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
                if (!response.ok) {
                    throw new Error('Character not found')
                }
                const data = await response.json()
                setCharacter(data)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }

    fetchCharacterDetails()
        
}, [id])
    const getStatusColor = (status) => {
        switch(status) {
            case 'Alive': return 'text-green-500'
            case 'Dead': return 'text-red-500'
            default: return 'text-gray-500'
        }
    }
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-blue-500 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Oops!</h1>
                    <p className="text-xl">{error}</p>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen  text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex justify-center items-center">
                        <img 
                            src={character.image} 
                            alt={character.name} 
                            className="w-full max-w-md rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-5xl font-bold text-blue-300 mb-4">{character.name}</h1>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem 
                                label="Status" 
                                value={character.status} 
                                className={getStatusColor(character.status)}
                            />
                            <DetailItem label="Species" value={character.species} />
                            {character.type && <DetailItem label="Type" value={character.type} />}
                            <DetailItem label="Gender" value={character.gender} />
                        </div>

                        <div className="space-y-4">
                            <DetailItem 
                                label="Origin" 
                                value={character.origin.name} 
                                className="text-blue-400"
                            />
                            <DetailItem 
                                label="Current Location" 
                                value={character.location.name} 
                                className="text-blue-400"
                            />
                        </div>

                       
                    </div>
                </div>
            </div>

            
        </div>
    )
}

const DetailItem = ({ label, value, className = '' }) => (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md">
        <h4 className="text-sm text-gray-400 mb-1">{label}</h4>
        <p className={`text-xl font-semibold ${className}`}>{value || 'Unknown'}</p>
    </div>
)

export default SingleCharacter