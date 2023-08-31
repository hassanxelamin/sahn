// Importing necessary libraries and functionalities from React and 'framer-motion'.
import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import NextImage from 'next/image';
// Importing the google form data.
import form from '@/src/data/google-form.json';
import {Howl, Howler} from 'howler';

// Defining an animation object for fading in effect for the chat container.
const fadeIn = {
  initial: { opacity: 0, scale: 0.9 },       // Initial state: semi-transparent and slightly scaled down.
  animate: { opacity: 1, scale: 1 },         // Final state: fully visible and regular scale.
  exit: { opacity: 0, scale: 0.9 },          // Exit state: same as initial.
  transition: { duration: 0.1 }              // Animation duration.
};

// Defining an animation object for chat container giving the appearance of each chat message fading in one after the other.
const container = {
    hidden: { opacity: 0, y: 20 },           // Initial state: semi-transparent and shifted downwards.
    visible: {
      opacity: 1,                            // Final state: fully visible.
      y: 0,                                 // Reset position to original.
      transition: {
        delayChildren: 0.3,                 // Delay before child animations start.
        staggerChildren: 0.2                // Stagger the animation for children elements.
      }
    }
};

interface ChatProps {
  setChatVisible: (value: boolean | ((prevState: boolean) => boolean)) => void;
}

// Main functional component definition.
const Chat = ({ setChatVisible }: ChatProps) => {

    // ----------------- State Variables ----------------- //
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [currentIndex, setCurrentIndex] = useState(0); // The current position in the 'form' chat flow.
    const [chatHistory, setChatHistory] = useState<{ label: string; answer?: string }[]>([]); // The ongoing history of chat messages displayed.
    const [inputValue, setInputValue] = useState(''); // The user's current input value in the chat.
    const [isLoading, setIsLoading] = useState(false); // State management for loading state (displayed as three dots in the UI).
    const containerRef = useRef<HTMLDivElement>(null); // A ref to directly manipulate the chat container's DOM properties, specifically to manage scrolling behavior.

    var sound = new Howl({
      src: ['/music/message.mp3']
    });

    // ----------------- Hooks ----------------- //

    useEffect(() => {
      sound.play();
    }, [chatHistory]);

    // useEffect hook that simulates the process of the chatbot loading the first message upon component mounting/after 1 second.
    useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
        setChatHistory([{ label: form.fields[0].label }]);
        setIsLoading(false);
      }, 1000);
    }, []);

    // Adjusts the chat container's scroll position whenever a new message is added.
    useEffect(() => {
      if (containerRef.current) {
        const element = containerRef.current;
        element.scrollTop = element.scrollHeight;
      }
    }, [chatHistory]);

    // ----------------- Event Handlers ----------------- //
    // Function to handle submission of answers in the chat and updates chat flow.
    const handleAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      // Get the input data from the form.
      const formData = new FormData(event.currentTarget);
      const answer = formData.get('answerInput') as string;
  
      // If the answer is empty, exit the function.
      if (answer.trim() === '') return;
  
      const newAnswers = { ...answers, [form.fields[currentIndex].id]: answer };
      setAnswers(newAnswers);
  
      // Update chat history with the new answer.
      const updatedHistory = [...chatHistory];
      updatedHistory[currentIndex].answer = answer;
      setChatHistory(updatedHistory);
  
      // Simulate a delay, and then either fetch the next question or end the chat flow.
      if (currentIndex + 1 < form.fields.length) {
          setIsLoading(true); // Display loading animation.
          setTimeout(() => {
              setIsLoading(false);
              setChatHistory(prevHistory => [
                  ...prevHistory,
                  { label: form.fields[currentIndex + 1].label }
              ]);
              setCurrentIndex((prevIndex) => prevIndex + 1);
          }, 1000);
      } else {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          
          // At this point, newAnswers has all the answers.
          const transformedAnswers = {
            "records": [
                {
                    "fields": {
                        "Name": "Questions",
                        "Q1": newAnswers[1234567891],
                        "Q2": newAnswers[1234567892],
                        "Q3": newAnswers[1234567893]
                    }
                }
            ]
        };
        console.log(JSON.stringify(transformedAnswers))
        try {
          const response = await fetch('/api/airtable', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(transformedAnswers),
          });
          // Handling the response (assuming your server responds with json)
          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.error("Error while sending data to /airtable:", error);
        }
      }
  
      // Clear input for the next entry.
      setInputValue('');
  };
  

  return (
    // main container
    <motion.div 
    initial={fadeIn.initial}
    animate={fadeIn.animate}
    exit={fadeIn.exit}
    transition={fadeIn.transition}
    id="container" 
    className={`bg-[#000] shadow-exact w-[532px] h-[354px] rounded-[10px] border border-[#A5A5A5] flex-col justify-start items-start inline-flex overflow-hidden`}
    >
        {/* top header */}
        <div className={`cursor-grab bg-[#000] h-[90px] drag-handle w-full items-center justify-center`}>
            {/* contact name & picture */}
            <div className={`flex item-center text-center items-center justify-between mt-[10px] px-[50px]`}>
                <div className='cursor-pointer'>
                  <NextImage 
                      onDragStart={(e) => e.preventDefault()} 
                      onClick={(e) => setChatVisible(prevState => !prevState)} 
                      src='/icons/left.png'
                      alt='back'
                      width={25}
                      height={57}
                  />
                </div>
                <div className='flex flex-col'>
                  <div className='rounded-full w-[50px] h-[50px] overflow-hidden'>
                      <img src="/images/avi.jpg" alt='profile picture' />
                  </div>
                  <div className='flex flex-col leading-10 text-white'>
                      <div className='text-[12px] font-bold'>sahn🎈</div>
                  </div>
                </div>
                <div>
                  <NextImage 
                      onDragStart={(e) => e.preventDefault()} 
                      src='/icons/left-black.png'
                      alt='back'
                      width={25}
                      height={57}
                  />
                </div>
            </div>
            <div>f</div>
        </div>

        {/* chat ui */}
        <div className='w-full h-full flex flex-col justify-end items-center text-[1.4rem] overflow-y-auto'>
            <div className='w-full'>
                <div className="mt-auto p-6 w-full h-full mx-auto rounded-xl shadow-md flex flex-col justify-end space-y-4 text-white font-inter">
                <div ref={containerRef} className="h-full w-full flex flex-col justify-between">
                    <div className='h-full'>
                    <div className="flex flex-col space-y-2">
                        {chatHistory.map((chatItem, index) => (
                          <div key={index} className="flex flex-col space-y-2">
                              <motion.div variants={container} initial="hidden" animate="visible" className="flex items-center p-[15px] w-[246.44px] bg-[#353635] bg-opacity-75 rounded-tl-[13px] rounded-tr-[13px] rounded-bl-[3px] rounded-br-[13px] flex-wrap mt-[10px]">
                                  {chatItem.label}
                              </motion.div>
                              <div className='flex items-center justify-end w-full pr-4'>
                                  {chatItem.answer && (
                                      <motion.div variants={container} initial="hidden" animate="visible" className="mr-2 text-right flex items-center justify-end p-[15px] w-[246.44px] bg-[#2E46E1] rounded-tl-[13px] rounded-tr-[13px] rounded-br-[3px] rounded-bl-[13px] flex-wrap mt-[10px] whitespace-normal flex-shrink-0">
                                          {chatItem.answer}
                                      </motion.div>
                                  )}
                              </div>
                          </div>
                        ))}
                        {isLoading && (
                        <motion.div variants={container} initial="hidden" animate="visible" className="flex items-center justify-center p-[15px] w-[50px] bg-[#353635] bg-opacity-75 rounded-tl-[13px] rounded-tr-[13px] rounded-bl-[3px] rounded-br-[13px]">
                            <div className="flex items-center justify-center w-full">
                            <div className="flex items-center justify-center space-x-1">
                                <span className="bg-white w-2 h-2 rounded-full"></span>
                                <span className="bg-white w-2 h-2 rounded-full"></span>
                                <span className="bg-white w-2 h-2 rounded-full"></span>
                            </div>
                            </div>
                        </motion.div>
                        )}
                    </div>
                      <form onSubmit={handleAnswer} className='flex justify-center relative w-full mt-[10px]'>
                          <input
                              name="answerInput"
                              type="text"
                              value={inputValue}   // Bind value to state
                              onChange={(e) => setInputValue(e.target.value)}   // Update state on input change
                              className="focus:outline-none focus:ring-0 border rounded p-2 w-full h-[35px] rounded-full text-white text-[1.4rem] border border-[#767676] border-[1px] bg-transparent pl-5 pr-[50px]"
                              placeholder="Type your answer..."
                              disabled={isLoading || currentIndex >= form.fields.length}
                              autoComplete="off"
                          />
                          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#2E46E1] text-white rounded-full w-[24px] h-[24px]">
                            <div className='flex items-center justify-center w-full h-full'>
                              <NextImage 
                                  onDragStart={(e) => e.preventDefault()} 
                                  src='/icons/up.png'
                                  alt='back'
                                  width={20}
                                  height={57}
                              />
                            </div>
                          </button>
                      </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default Chat;