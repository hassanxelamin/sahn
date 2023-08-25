import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Taskbar = () => {

    const icons = [
        { name: 'Apple', src: '/icons/apple.svg', link: 'https://music.apple.com/us/artist/sahn/1670498747'},
        { name: 'Instagram', src: '/icons/instagram.svg', link: 'https://www.instagram.com/whoissahn/'},
        { name: 'SoundCloud', src: '/icons/soundcloud.svg', link: 'https://soundcloud.com/sahnn'},
        { name: 'Spotify', src: '/icons/spotify.svg', link: 'https://open.spotify.com/artist/1FZ9KkusZYSO3saEkB9NMG?si=PMdtL7cfQVm-XFjpXPMVvg'},
        { name: 'TikTok', src: '/icons/tiktok.svg', link: 'https://www.tiktok.com/@retoesfy'},
        { name: 'YouTube', src: '/icons/youtube.svg', link: 'https://www.youtube.com/@sahnyoutube'},
      ];

  return (
    <div className='w-[330px] h-[65px] sm:w-[380px] sm:h-[65px] md:w-[440px] md:h-[70px] absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-tl-[18px] rounded-tr-[18px] bg-opacity-50 bg-white'>
        <div className='flex items-center justify-center w-full h-full space-x-[12px] sm:space-x-[15px]'>
            {icons.map(icon => (
                <div 
                    key={icon.name} 
                    className="group relative transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                >
                    <Link legacyBehavior href={icon.link}>
                        <Image 
                            src={icon.src}
                            alt={icon.name}
                            width={40} // adjusted for very small screens
                            height={40} // adjusted for very small screens
                            className="sm:w-[42px] sm:h-[42px] md:w-[52px] md:h-[52px]" // sizes for larger screens
                        />
                    </Link>
                    {/* Render active dot indicator */}
                    <span className="opacity-0 group-hover:opacity-100 absolute bottom-[-8px] left-1/2 w-[4px] h-[4px] bg-black rounded-full transform -translate-x-1/2 transition-opacity duration-300"></span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Taskbar;