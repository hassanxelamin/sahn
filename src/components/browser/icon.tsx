import React, { useState } from 'react';
import NextImage from 'next/image';

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
    const [visible, setVisible] = useState(true);

    if (!visible) return null; 

    return (
        <div className={`flex flex-col justify-center items-center font-sk font-bold cursor-grab`}>
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
        </div>
    )
}

export default FileIcon;
