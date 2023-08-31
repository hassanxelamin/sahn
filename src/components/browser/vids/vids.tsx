import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.1 }
};

interface ChatProps {
  setVidsVisible: (value: boolean | ((prevState: boolean) => boolean)) => void;
}

const Vids = ({ setVidsVisible }: ChatProps) => {

  return (
    <motion.div 
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      exit={fadeIn.exit}
      transition={fadeIn.transition}
      id="container"
      className={`bg-[#BFC2C8] shadow-exact w-[532px] h-[354px] rounded-[10px] border border-[#A5A5A5] flex-col justify-start items-start inline-flex overflow-hidden`}
    >
        <div className={`cursor-grab drag-handle bg-[#FFF] w-full h-[52px] justify-start items-center inline-flex pl-[2rem] pr-[460px]`}>
            <div className={`flex items-start gap-[0.8rem] inline-flex`}>
                <div className={`w-[1.2rem] h-[1.2rem] bg-red-400 rounded-full cursor-pointer`} onClick={(e) => setVidsVisible(prevState => !prevState)}></div>
                <div className={`w-[1.2rem] h-[1.2rem] bg-amber-300 rounded-full cursor-pointer`} onClick={(e) => setVidsVisible(prevState => !prevState)}></div>
                <div className={`w-[1.2rem] h-[1.2rem] bg-green-400 rounded-full cursor-pointer`}></div>
            </div>
        </div>
        <div className="flex w-full h-full">
            <iframe width="560" height="315" src="https://www.youtube.com/watch?v=W7IV3qRl9sc&ab_channel=sahn" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>  
    </motion.div>
  )
}

export default Vids;

