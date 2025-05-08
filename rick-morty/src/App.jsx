// import { useEffect, useState } from 'react'
// import './App.css'
// import Home from './Pages/Home'
// import SingleCharacter from './Pages/SingleCharacter'
// import { Route, Routes } from 'react-router-dom'

import { useEffect, useMemo, useRef, useState } from "react"

// function App() {
//    const [currentTime, setCurrentTime] = useState(new Date())
  
//       useEffect(() => {
//           const timer = setInterval(() => {
//               setCurrentTime(new Date())
//           }, 1000)
//           return () => clearInterval(timer)
//       }, [])

//   return (
//     <div >
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/character/:id" element={<SingleCharacter />} />
//       </Routes>
//       <footer className="fixed z-50 bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-center text-white">
//                 {currentTime.toLocaleString()}
//             </footer>
//     </div>
//   )
// }

// export default App


const App = () => {
  const [number, setNumber] = useState(0)
  const refV = useRef()

  const handleChange = (e) =>{
    setNumber(e.target.value)
  }
  useEffect(()=>{
    refV.current.focus()
  })
  
  function isPrime(num) {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return num > 1;
  }
    
  // if having multiple input how can i focus on each input after clicking the button

  const primeNumber = (num) => {
    let primes = [];
    for (let i = 2; i < num; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }
    return primes;
  };

  // UseMemo: Only recomputes when `number` changes
  const prime = useMemo(() => primeNumber(number), [number]);
  
  return(
    <div>
      <p>Enter a number:</p>
      
      <input ref={refV} type="text" onChange = {handleChange}/>
      {prime.length > 0 && (
        <div>
          <h2>Prime numbers less than {number}:</h2>
          <ul>
            {prime.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
