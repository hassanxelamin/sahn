import React, { ReactNode, useState } from 'react';

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
      <div id="container" style={{ 
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
      </div>
  )
}

export default Browser;

