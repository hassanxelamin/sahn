'use client'
/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import FileIcon from './icon';
import { draggableItems } from '@/src/constants/ui';
import Chat from '@/src/components/browser/chat/chat';
import Release from '@/src/components/browser/release/release';
import Vids from '@/src/components/browser/vids/vids';

const Browsers = () => {
    const [activeBrowser, setActiveBrowser] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const smRef = useRef(null);
    const lgRef = useRef(null);
    const xlRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isXL, setIsXL] = useState(false);

    const [chatVisible, setChatVisible] = useState(true);
    const [releaseVisible, setReleaseVisible] = useState(true);
    const [vidsVisible, setVidsVisible] = useState(true);

    // useEffect(() => {
    //     let timeouts: NodeJS.Timeout[] = []; 
    //     // Start from the second browser
    //     for (let index = 1; index < currentBrowsers.length; index++) {
    //         const timer = setTimeout(() => {
    //             toggleBrowserVisibility(index);
    //         }, index * 30);  
    
    //         timeouts.push(timer);
    //     }
    
    //     return () => {
    //         timeouts.forEach(timer => clearTimeout(timer));
    //     };
    // }, []);
    
    useEffect(() => {
        const checkSize = () => {
            if (smRef.current) {
                setIsMobile(getComputedStyle(smRef.current).display === 'none');
            }
            if (lgRef.current) {
                const isLgDisplayNone = getComputedStyle(lgRef.current).display === 'none';
                let isSmDisplayNone = true; // default to true
            
                if (smRef.current) {
                    isSmDisplayNone = getComputedStyle(smRef.current).display === 'none';
                }
            
                setIsDesktop(isLgDisplayNone && !isSmDisplayNone);
            }
            if (xlRef.current) {
                setIsXL(getComputedStyle(xlRef.current).display === 'none');
            }
        };
    
        checkSize();  // Initial check
    
        window.addEventListener('resize', checkSize);
    
        return () => {
            window.removeEventListener('resize', checkSize);
        };
    }, []);

    useEffect(() => {
        function handleDocumentClick(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setSelectedItem(null);
            }
        }
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        console.log('Chat Visible:', chatVisible);
        console.log('Release Visible:', releaseVisible);
        console.log('Vids Visible:', vidsVisible);
    }, [chatVisible, releaseVisible, vidsVisible]);

    const handleRedirect = async () => {
        try {
            const response = await fetch('/api/mailto', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }
            });
          } catch (error) {
            console.error("Error while sending mail", error);
          }
    }

    const MobileVersion = ({ items, selectedItem, setSelectedItem, toggleBrowserVisibility }: any) => (
        items.map((item: any, index: any) => (
            // <Link href={`${item.link}`}>
                <div 
                    className={`cursor-grab flex items-center justify-center gap-x-[20px] mb-[10px] md:absolute md:h-auto md:w-auto`}

                    style={{ 
                        left: item.positionleft, 
                        top: item.positiontop, 
                        right: item.positionright, 
                        bottom: item.positionbottom 
                    }}

                    onClick={(e) => {
                        e.preventDefault();
                        console.log('Icon clicked:', item.linkedBrowser);

                        if (selectedItem === index) {
                          setSelectedItem(null);
                        } else {
                          setSelectedItem(index);
                        }
                    
                        if(item.linkedBrowser === 0) {
                          setVidsVisible(prevState => !prevState);
                        } else if(item.linkedBrowser === 1) {
                          setChatVisible(prevState => !prevState);
                        } else if(item.linkedBrowser === 2) {
                          setReleaseVisible(prevState => !prevState);
                        } else if(item.linkedBrowser === 3) {
                          window.location.href = 'mailto:email@yahoo.com'; 
                        }
                    }}
                >
                    <FileIcon 
                        iconSrc={item.iconSrc}
                        iconAlt={item.iconAlt}
                        labelText={item.labelText}
                        selected={selectedItem === index}
                    />
                </div>
            // </Link>
            ))
        );

    return (
        <div id="main-bounds" className={`${isMobile ? 'w-screen h-screen flex flex-col p-4 overflow-x-hidden' : 'h-screen w-screen relative p-4'}`}>
            <div ref={smRef} className="hidden md:block"></div>
            <div ref={lgRef} className="hidden lg:block"></div>
            <div ref={xlRef} className="hidden xl:block"></div>
            
            {isMobile ? (
                <div className='flex justify-between px-5'>
                    <MobileVersion items={draggableItems} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
                </div>
            ) : (
                draggableItems.map((item, index) => (
                    <Draggable key={index} bounds="#main-bounds">
                        <div
                            className={`cursor-grab w-full flex items-center justify-center flex-wrap gap-x-[20px] md:absolute md:h-auto md:w-auto`}
                            style={{ 
                                left: item.positionleft, 
                                top: item.positiontop, 
                                right: item.positionright, 
                                bottom: item.positionbottom 
                            }}
                            onClick={(e) => {
                                e.preventDefault();

                                console.log('Icon clicked:', item.linkedBrowser);
        
                                if (selectedItem === index) {
                                  setSelectedItem(null);
                                } else {
                                  setSelectedItem(index);
                                }
                            
                                if(item.linkedBrowser === 0) {
                                  setVidsVisible(prevState => !prevState);
                                } else if(item.linkedBrowser === 1) {
                                  setChatVisible(prevState => !prevState);
                                } else if(item.linkedBrowser === 2) {
                                  setReleaseVisible(prevState => !prevState);
                                } else if(item.linkedBrowser === 3) {
                                  window.location.href = 'mailto:email@yahoo.com'; 
                                }
                            }}
                            onDoubleClick={(e) => {
                                e.stopPropagation();
                            }}
                            
                        >
                            <FileIcon 
                                iconSrc={item.iconSrc}
                                iconAlt={item.iconAlt}
                                labelText={item.labelText}
                                selected={selectedItem === index}
                            />
                        </div>
                    </Draggable>
                ))
            )}


            <div className={`${isMobile ? 'flex flex-col justify-center gap-y-5' : isXL ? '' : ''}`}>

                {/* Chat Window */}
                {chatVisible && (
                    <Draggable bounds="#main-bounds" handle=".drag-handle" >
                        <div className={`${isMobile ? 'flex'  : isXL ? 'absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-50' : 'absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 z-50'}`}>
                            <Chat setChatVisible={setChatVisible} />
                        </div>
                    </Draggable>
                )}

                {/* Release Window */}
                {releaseVisible && (
                    <Draggable bounds="#main-bounds" handle=".drag-handle">
                        <div className={`${isMobile ? 'flex'  : isXL ? 'absolute left-[25px]' : 'absolute left-[140px] top-[10px]'}`}>
                            <Release setReleaseVisible={setReleaseVisible} />
                        </div>
                    </Draggable>
                )}

                {/* Video Window */}
                {vidsVisible && (
                    <Draggable bounds="#main-bounds" handle=".drag-handle">
                        <div className={`${isMobile ? 'flex'  : isXL ? 'absolute right-[25px] bottom-[25px]' : 'absolute right-[140px] bottom-[25px]'}`}>
                            <Vids setVidsVisible={setVidsVisible} />
                        </div>
                    </Draggable>
                )}

            </div>

        </div>
    );
}

export default Browsers;