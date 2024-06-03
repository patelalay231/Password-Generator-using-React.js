import { useState, useCallback, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassowrd] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const passwordRef = useRef(null);
  
  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  },[password,setIsClicked])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "!~&*^$#%?+=`_-@";

    for(let i = 1; i<= length ; i++){
      let charIdx = Math.floor(Math.random() * str.length + 1);
      pass += str[charIdx];
    }

    setPassowrd(pass)

  },[length,numberAllowed,charAllowed,setPassowrd])

  useEffect(() => {
    passwordGenerator()
  },[length,numberAllowed,charAllowed]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'> 
      <h1 className="text-4xl text-center text-white mt-4 mb-4">Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password'ref={passwordRef} readOnly/>
          <button className={`outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ${isClicked ? 'clicked' : ''}`}onClick={copyPassToClipboard}>
          Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={25} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}}/>
            <label>Length : {length}</label>
            <input type="checkbox"  defaultChecked={numberAllowed} id="numberInput" onChange={(e) => {setNumberAllowed(e.target.checked)}}/>
            <label>Numbers</label>
            <input type="checkbox"  defaultChecked={charAllowed} id="charInput" onChange={(e) => {setCharAllowed(e.target.checked)}}/>
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
