import React from 'react';
import Image from 'next/image';

const Taskbar = () => {
    const icons = [
        { name: 'Apple', src: '/icons/apple.svg' },
        { name: 'Instagram', src: '/icons/instagram.svg' },
        { name: 'SoundCloud', src: '/icons/soundcloud.svg' },
        { name: 'Spotify', src: '/icons/spotify.svg' },
        { name: 'TikTok', src: '/icons/tiktok.svg' },
        { name: 'YouTube', src: '/icons/youtube.svg' },
      ];
  return (
    <div className='w-[475px] h-[70px] absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-tl-[18px] rounded-tr-[18px] bg-opacity-50 bg-white'>
        <div className='flex items-center justify-center w-full h-full space-x-[15px]'>
            {icons.map(icon => (
            <div 
                key={icon.name} 
                className="group relative transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
            >
                <Image 
                    src={icon.src}
                    alt={icon.name}
                    width={52}
                    height={52}
                />
                {/* Render active dot indicator */}
                <span className="opacity-0 group-hover:opacity-100 absolute bottom-[-8px] left-1/2 w-[4px] h-[4px] bg-black rounded-full transform -translate-x-1/2 transition-opacity duration-300"></span>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Taskbar;