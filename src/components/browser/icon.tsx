import React, { useState } from 'react';
import NextImage from 'next/image';

interface PropTypes {
    iconSrc: string;   
    iconAlt: string;   
    labelText: string; 
}

const FileIcon = ({ 
    iconSrc,
    iconAlt,
    labelText,
}: PropTypes) => { 
    const [visible, setVisible] = useState(true);

    if (!visible) return null; 

    return (
        <div className={`flex flex-col justify-center items-center font-sk font-bold cursor-grab`}>
            <div className='hover:bg-black w-[83px] h-[80px] rounded-[7px] hover:bg-opacity-[0.05] flex justify-center items-center'>
                <NextImage 
                    onDragStart={(e) => e.preventDefault()} 
                    src={iconSrc}
                    alt={iconAlt}
                    width={75}
                    height={57}
                />
            </div>
            <div className='mt-[2px] text-[1.2rem]'>
                {labelText}
            </div>
        </div>
    )
}

export default FileIcon;
