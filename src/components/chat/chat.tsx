import { useEffect, useRef, useState } from 'react';
import form from '@/src/data/google-form.json';
import { motion } from "framer-motion";

interface Field {
  label: string;
  description: string | null;
  type: string;
  id: string;
  required: boolean;
}

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const Chat = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState<{ label: string; answer?: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setChatHistory([{ label: form.fields[0].label }]);
      setIsLoading(false);
    }, 1000); // 1-second delay for the first item
  }, []);

  const handleAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
    const answer = formData.get('answerInput') as string;
    if (answer.trim() === '') return;
  
    const updatedHistory = [...chatHistory];
    updatedHistory[currentIndex].answer = answer;
  
    setChatHistory(updatedHistory);
  
    if (currentIndex + 1 < form.fields.length) {
      setIsLoading(true); // Start showing the three dots
      setTimeout(() => {
        setIsLoading(false); // Stop showing the three dots
        setChatHistory(prevHistory => [
          ...prevHistory,
          { label: form.fields[currentIndex + 1].label }
        ]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 1000); // 1 second delay for the subsequent items
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  
    setInputValue('');
  };

  useEffect(() => {
    if (containerRef.current) {
      const element = containerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className='w-full h-full flex flex-col justify-end items-center text-[1.4rem]'>
      <div className='w-[478px]'>
        <div className="mt-auto p-6 w-full h-full mx-auto rounded-xl shadow-md flex flex-col justify-end space-y-4 text-white font-inter">
          <div ref={containerRef} className="h-96 overflow-y-auto flex flex-col-reverse">
            <div className="flex flex-col space-y-2 hide-scrollbar">
              {chatHistory.map((chatItem, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <motion.div variants={container} initial="hidden" animate="visible" className="flex items-center p-[15px] w-[246.44px] bg-[#353635] bg-opacity-75 rounded-tl-[13px] rounded-tr-[13px] rounded-bl-[3px] rounded-br-[13px] flex-wrap">
                    {chatItem.label}
                  </motion.div>
                  <div className='flex items-center justify-end w-full pr-4'>
                    {chatItem.answer && (
                      <motion.div variants={container} initial="hidden" animate="visible" className="mr-2 text-right flex items-center p-[15px] w-[246.44px] bg-[#2E46E1] rounded-tl-[13px] rounded-tr-[13px] rounded-br-[3px] rounded-bl-[13px] flex-wrap">
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
          </div>

          <form onSubmit={handleAnswer} className='flex justify-center w-full relative'>
              <input
                name="answerInput"
                type="text"
                value={inputValue}   // Bind value to state
                onChange={(e) => setInputValue(e.target.value)}   // Update state on input change
                className="focus:outline-none focus:ring-0 border rounded p-2 w-full h-[35px] rounded-full text-white text-[1.4rem] border border-[#767676] border-[1px] bg-transparent pl-5 pr-[50px]"
                placeholder="Type your answer..."
                disabled={currentIndex >= form.fields.length} 
                autoComplete="off"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#2E46E1] text-white rounded-full w-[24px] h-[24px]" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
