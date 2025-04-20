import { useState } from 'react'
import './App.css'
import Tesseract from "tesseract.js";
import "tailwindcss";
import { useSpeechSynthesis } from "react-speech-kit";
import Mic from './assets/mic';
import { motion } from 'framer-motion';


function App() {

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);
  const [isSpeaking,setIsSpeaking] = useState(false);
  //const [loading,setLoading] = usestate(false);

  const imageGet = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  }

  const textgenerate = () => {
    //setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (item) => console.log(item),
    }).then(({ data: { text } }) => {
      setMessage(text);
      //setLoading(false);
    });
  };

  const speech = () => {

    if ("speechSynthesis" in window) {
      const tell = new SpeechSynthesisUtterance(message);
      tell.rate = 1.8;

      setIsSpeaking(true);

      tell.onend = () => {
        setIsSpeaking(false);
      }

      window.speechSynthesis.speak(tell);
    } else {
      alert("This browser can't support Speech synthesis");
    }

  };

  return (

    <div className='flex flex-col items-center gap-8 backdrop-blur-sm p-5 border-1 '>
      <h1 className='text-3xl font-bold text-white '>Text Generator</h1>
      <div className='flex gap-4'>

        <input type='file' className='border-1 bg-gray-400 flex justify-center items-center text-center rounded-lg p-2' onChange={imageGet} />
        <button onClick={textgenerate} className='border-1 rounded-xl p-2 bg-sky-400 font-semibold text-sm'>Send</button>


      </div>
      <div className='flex gap-10'>
        <div className='flex flex-col gap-2'>
          <div className='w-120 h-15 border-1 rounded-2xl flex justify-center items-center bg-gray-400 text-lg font-semibold '>
            IMAGE
          </div>
          <div className='w-120 h-120 border-1 rounded-2xl'>
            {image && <img className='w-full h-full rounded-2xl' src={image} alt='image' />}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-120 h-15 border-1 rounded-2xl flex justify-around items-center bg-sky-400 text-lg font-semibold '>
            TEXT
            {/* <button onClick={speech} className='border-1 p-1 rounded-2xl '> */}
            <motion.div
              animate={isSpeaking ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: '48px', color: 'red', cursor: 'pointer', border: "solid 1px black", padding: "5px", borderRadius: "20px" }}
              onClick={speech}
            >
              <Mic />
            </motion.div>

            {/* </button> */}
          </div>
          <div className='w-120 h-120 border-1 rounded-2xl overflow-y-scroll bg-white '>
            {message ? <p className='p-4 text-md font-semibold '>{message}</p> : <p className='flex justify-center items-center p-4 mt-50 text-lg text-blue-700'>Click the send button<br /> after the file is chosen</p>}
          </div>
        </div>


      </div>



    </div>
  )
}

export default App;
