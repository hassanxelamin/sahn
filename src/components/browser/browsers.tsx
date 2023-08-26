'use client'
/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import Browser from '@/src/components/browser/browser';
import FileIcon from './icon';
import { draggableItems, browsers } from '@/src/constants/ui';
import Link from 'next/link';
import Chat from '../chat/chat';

const Browsers = () => {
    const [activeBrowser, setActiveBrowser] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentBrowsers, setCurrentBrowsers] = useState(browsers);
    // const smRef = useRef(null);
    // const [isMobile, setIsMobile] = useState(false);  // To detect if it's mobile
    const [isChatVisible, setChatVisible] = useState(false);
    const smRef = useRef(null);
    const lgRef = useRef(null);
    const xlRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false); // Below 'md' breakpoint
    const [isDesktop, setIsDesktop] = useState(false); // Between 'md' and 'lg'
    const [isXL, setIsXL] = useState(false); // Above 'lg' breakpoint

    const toggleBrowserVisibility = (index: number) => {
        const updatedBrowsers = [...currentBrowsers];
        updatedBrowsers[index].isVisible = !updatedBrowsers[index].isVisible;
        setCurrentBrowsers(updatedBrowsers);
    }

    useEffect(() => {
        toggleBrowserVisibility(0); // Show the first browser immediately
    }, []);

    useEffect(() => {
        let timeouts: NodeJS.Timeout[] = []; 
    
        // Start from the second browser
        for (let index = 1; index < currentBrowsers.length; index++) {
            const timer = setTimeout(() => {
                toggleBrowserVisibility(index);
            }, index * 30);  
    
            timeouts.push(timer);
        }
    
        return () => {
            timeouts.forEach(timer => clearTimeout(timer));
        };
    }, []);
    
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

    const MobileVersion = ({ items, selectedItem, setSelectedItem, toggleBrowserVisibility }: any) => (
        items.map((item: any, index: any) => (
            // <Link href={`${item.link}`}>
                <div 
                    className={`cursor-grab flex items-center justify-center gap-x-[20px] md:absolute md:h-auto md:w-auto`}
                    style={{ 
                        left: item.positionleft, 
                        top: item.positiontop, 
                        right: item.positionright, 
                        bottom: item.positionbottom 
                    }}
                    onClick={(e) => {
                        e.preventDefault();  // Prevent default navigation
                        if (item.link === '/message') {
                            setChatVisible(true); // Set chat to visible when the message icon is clicked
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
        <div id="main-bounds" className="h-screen w-screen relative p-4">
            <div ref={smRef} className="hidden md:block"></div>
            <div ref={lgRef} className="hidden lg:block"></div>
            <div ref={xlRef} className="hidden xl:block"></div>
            
            {isMobile ? (
                <div className='flex justify-between px-5'>
                    <MobileVersion items={draggableItems} selectedItem={selectedItem} setSelectedItem={setSelectedItem} toggleBrowserVisibility={toggleBrowserVisibility} />
                    <div style={{ 
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        right: isChatVisible ? 0 : '-100%', // Slide in from the right
                        width: '100%',
                        height: '100%',
                        transition: 'right 0.3s ease-in-out', // Apply transition effect // Ensure it overlays other content
                        backgroundColor: 'black'
                    }} className='w-full h-full z-30'>

                        {/* Close button to hide the chat */}
                        <button 
                            onClick={() => setChatVisible(false)}
                            style={{ position: 'absolute', top: 80, left: 20 }}
                            className='text-white'    
                        >
                            Close
                        </button>

                        {/* Here's where the chat component would go */}
                        <div className='w-screen h-screen py-5'>
                            <Chat />
                        </div>
                    </div>
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
                                e.stopPropagation();
                                if (selectedItem === index) {
                                    setSelectedItem(null);
                                } else {
                                    setSelectedItem(index);
                                }
                            }}
                            onDoubleClick={(e) => {
                                e.stopPropagation();
                                if (typeof item.linkedBrowser === 'number') {
                                    toggleBrowserVisibility(item.linkedBrowser);
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
                    </Draggable>
                ))
            )}
            {isMobile ? (
                <>
                    {currentBrowsers.map((browser, index) => (
                        (browser.showOnMobile !== false || !isMobile) && browser.isVisible && (
                            <div 
                                className={`flex mt-10 w-full`} 
                                style={{ 
                                    zIndex: activeBrowser === browser.zIndex ? 10 : 1, 
                                    left: isMobile ? '' : isDesktop ? '' : isXL ? browser.positionleftxl : browser.positionleft,
                                    top: isMobile ? '' : isDesktop ? '' : isXL ? browser.positiontopxl : browser.positiontop,
                                    right: isMobile ? '': isDesktop ? '' : isXL ? browser.positionrightxl : browser.positionright,
                                    bottom: isMobile ? '' : isDesktop ? '' : isXL ? browser.positionrightxl : browser.positionright
                                }}
                            >
                                <Browser bgColor={browser.bgColor} secondaryColor={browser.secondaryColor} bHeight={browser.bHeight} bWidth={browser.bWidth} hHeight={browser.hHeight} toggleVisibility={() => toggleBrowserVisibility(index)}>
                                    {browser.content}
                                </Browser>
                            </div>
                        )
                    ))}
                </>
            ) : (
                <>
                    {currentBrowsers.map((browser, index) => (
                        browser.isVisible && (
                            <Draggable 
                                key={index} 
                                bounds="#main-bounds" 
                                handle=".drag-handle" 
                                onStart={() => setActiveBrowser(browser.zIndex)}
                            >
                                <div 
                                    className={`cursor-grab absolute ${isMobile ? 'hidden-on-mobile' : ''}`} 
                                    style={{ 
                                        zIndex: activeBrowser === browser.zIndex ? 10 : 1, 
                                        left: isMobile ? '' : isDesktop ? '' : isXL ? browser.positionleftxl : browser.positionleft,
                                        top: isMobile ? '' : isDesktop ? '' : isXL ? browser.positiontopxl : browser.positiontop,
                                        right: isMobile ? '' : isDesktop ? '' : isXL ? browser.positionrightxl : browser.positionright,
                                        bottom: isMobile ? '' : isDesktop ? '' : isXL ? browser.positionrightxl : browser.positionright
                                    }}
                                >
                                    <Browser bgColor={browser.bgColor} secondaryColor={browser.secondaryColor} bHeight={browser.bHeight} bWidth={browser.bWidth} hHeight={browser.hHeight} toggleVisibility={() => toggleBrowserVisibility(index)}>
                                        {browser.content}
                                    </Browser>
                                </div>
                            </Draggable>
                        )
                    ))}
                </>
            )}
        </div>
    );
}

export default Browsers;

// -----------------------------------------------------------------------------------------------------------------------------------------------------------

{/* <Draggable 
    bounds="#main-bounds" 
    handle=".drag-handle" 
    onStart={() => setActiveBrowser(3)}
>
    <div 
        className='absolute top-[55px] right-[100px]' 
        style={{ zIndex: activeBrowser === 3 ? 10 : 1 }}
    >
        <SingleBrowser bgColor="#000" secondaryColor="#3D3E44" />
    </div>
</Draggable> */}