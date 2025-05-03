import { useEffect, useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import SingleCharacter from './Pages/SingleCharacter'
import { Route, Routes } from 'react-router-dom'

function App() {
   const [currentTime, setCurrentTime] = useState(new Date())
  
      useEffect(() => {
          const timer = setInterval(() => {
              setCurrentTime(new Date())
          }, 1000)
          return () => clearInterval(timer)
      }, [])

  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<SingleCharacter />} />
      </Routes>
      <footer className="fixed z-50 bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-center text-white">
                {currentTime.toLocaleString()}
            </footer>
    </div>
  )
}

export default App
