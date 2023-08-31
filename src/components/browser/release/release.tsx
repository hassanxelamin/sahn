import React from 'react';
import { motion } from 'framer-motion';
import NextImage from 'next/image';

const fadeIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.1 }
};

interface ChatProps {
  setReleaseVisible: (value: boolean | ((prevState: boolean) => boolean)) => void;
}

const Release = ({ setReleaseVisible }: ChatProps) => {

  return (
    <motion.div 
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      exit={fadeIn.exit}
      transition={fadeIn.transition}
      id="container" 
      className={`bg-[#1E3264] shadow-exact w-[532px] h-[354px] rounded-[10px] border border-[#A5A5A5] flex-col justify-start items-start inline-flex overflow-hidden`}
    >
        <div className={`cursor-grab bg-[#FFF] h-[52px] drag-handle w-full justify-start items-center inline-flex pl-[2rem] pr-[460px]`}>
            <div className={`flex items-start gap-[0.8rem] inline-flex`}>
                <div className={`w-[1.2rem] h-[1.2rem] bg-red-400 rounded-full cursor-pointer`} onClick={(e) => setReleaseVisible(prevState => !prevState)} ></div>
                <div className={`w-[1.2rem] h-[1.2rem] bg-amber-300 rounded-full cursor-pointer`} onClick={(e) => setReleaseVisible(prevState => !prevState)} ></div>
                <div className={`w-[1.2rem] h-[1.2rem] bg-green-400 rounded-full cursor-pointer`}></div>
            </div>
        </div>
        <div className='flex items-center justify-between w-full h-full px-20'>
          <div className='flex flex-col items-center gap-y-5'>
            <div className='w-[200px] h-[200px] rounded-[10px] bg-white overflow-hidden'>
            <img src="/images/thousand.jpg" alt='profile picture' />
            </div>
          </div>
          <div className='text-white w-full h-full flex items-center justify-start ml-10'>
            <div className='flex flex-col justify-start w-[200px]'>
              <div className='mb-10'>
                <div className='text-white text-[13px] font-bold font-gotham'>Now playing...</div>
                <div className='text-white text-[20px] font-bold font-gotham mt-1'>A Thousand Miles</div>
                <div className='text-white text-[18px]'>sahn</div>
              </div>
              <div className='flex gap-x-8'>
                <div className='cursor-pointer'>
                    <NextImage 
                      src='/music/spotify.png'
                      alt='spotify'
                      width={30}
                      height={30}
                    />
                </div>
                <div className='cursor-pointer'>
                  <NextImage 
                    src='/music/apple.png'
                    alt='apple'
                    width={30}
                    height={30}
                  />
                </div>
                <div className='cursor-pointer'>
                  <NextImage 
                    src='/music/soundcloud.png'
                    alt='soundcloud'
                    width={30}
                    height={30}
                  />
                </div>
                <div className='cursor-pointer'>
                  <NextImage 
                    src='/music/youtube.png'
                    alt='youtube'
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
    </motion.div>
  )
}

export default Release;

