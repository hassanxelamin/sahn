import React, { useState } from 'react';

interface BrowserTypes {
    bgColor: string;
    secondaryColor: string;
}

const SingleBrowser = ({ bgColor, secondaryColor }: BrowserTypes) => { // Provide a default value in case no prop is passed
  const [visible, setVisible] = useState(true);  // Introduce visibility state

  if (!visible) return null;  // If not visible, render nothing

  return (
    <div id="container" style={{ 
                            backgroundColor: bgColor, 
                            boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.3)' 
                        }} className={`w-[400px] h-[200px] rounded-[5px] border border-[#A5A5A5] flex-col justify-start items-start inline-flex overflow-hidden`}>


        <div style={{ backgroundColor: secondaryColor }} className={`drag-handle w-full h-[20px] justify-start items-center inline-flex pl-[0.7rem] pr-[460px]`}>


            <div className={`flex items-start gap-[0.8rem] inline-flex`}>
                <div className={`w-[1.2rem] h-[1.2rem] bg-red-400 rounded-full`} onClick={() => setVisible(false)} ></div>
                <div className={`w-[1.2rem] h-[1.2rem] bg-amber-300 rounded-full`} onClick={() => setVisible(false)} ></div>
                <div className={`w-[1.2rem] h-[1.2rem] bg-green-400 rounded-full`}></div>
            </div>

            
        </div>
    </div>
  )
}

export default SingleBrowser;
