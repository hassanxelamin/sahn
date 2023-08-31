import React, { useState } from 'react';
import NextImage from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.1 } // You can adjust the duration or use other transition properties
  };

interface PropTypes {
    iconSrc: string;
    iconAlt: string;
    labelText: string;
    selected: boolean;
}

const FileIcon = ({ 
    iconSrc,
    iconAlt,
    labelText,
    selected
}: PropTypes & { selected: boolean }) => { 

    return (
        <motion.div 
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        exit={fadeIn.exit} 
        className={`flex flex-col justify-center items-center font-sk font-bold cursor-grab`}>
            <div className={`w-[83px] h-[80px] rounded-[7px] flex justify-center items-center ${selected ? 'bg-black bg-opacity-[0.05]' : 'hover:bg-black hover:bg-opacity-[0.05]'}`}>
                <NextImage 
                    onDragStart={(e) => e.preventDefault()} 
                    src={iconSrc}
                    alt={iconAlt}
                    width={75}
                    height={57}
                />
            </div>
            {labelText && (  // only render this div if labelText is provided
                <div className={`mt-[2px] text-[1.4rem] font-bold text-white rounded-[5px] px-[3px] py-[1px] ${selected ? 'bg-[#0063E1]' : ''}`}>
                    {labelText}
                </div>
            )}
        </motion.div>
    )
}

export default FileIcon;
