import React, { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.1 } // You can adjust the duration or use other transition properties
  };

interface BrowserTypes {
    bgColor: string;
    secondaryColor: string;
    children?: ReactNode;
    bWidth: string;
    bHeight: string;
    hHeight: string;
    toggleVisibility: () => void;
}

const Browser = ({ bgColor, secondaryColor, children, bWidth, bHeight, hHeight, toggleVisibility }: BrowserTypes) => {

  return (
      <motion.div 
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      exit={fadeIn.exit}
      transition={fadeIn.transition}
      id="container" style={{ 
                              backgroundColor: bgColor, 
                              boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.3)', 
                              width: bWidth,
                              height: bHeight
                          }} className={`rounded-[10px] border border-[#A5A5A5] flex-col justify-start items-start inline-flex overflow-hidden`}>
          <div style={{ backgroundColor: secondaryColor, height: hHeight}} className={`drag-handle w-full justify-start items-center inline-flex pl-[2rem] pr-[460px]`}>
              <div className={`flex items-start gap-[0.8rem] inline-flex`}>
                  <div className={`w-[1.2rem] h-[1.2rem] bg-red-400 rounded-full cursor-pointer`} onClick={toggleVisibility}></div>
                  <div className={`w-[1.2rem] h-[1.2rem] bg-amber-300 rounded-full cursor-pointer`} onClick={toggleVisibility}></div>
                  <div className={`w-[1.2rem] h-[1.2rem] bg-green-400 rounded-full cursor-pointer`}></div>
              </div>
          </div>
        {children}
      </motion.div>
  )
}

export default Browser;

