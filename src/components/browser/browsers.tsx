'use client'

import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import Browser from '@/src/components/browser/browser';
import SingleBrowser from '@/src/components/browser/single-browser';
import FileIcon from './icon';
import { draggableItems, browsers } from '@/src/constants/ui';

const Browsers = () => {
    const [activeBrowser, setActiveBrowser] = useState<number | null>(null);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // This function will be triggered on every click in the document
        function handleDocumentClick(event: MouseEvent) {
            // If the click was outside of the container, unselect the item
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setSelectedItem(null);
            }
        }

        // Add the event listener to the document
        document.addEventListener('click', handleDocumentClick);

        // Remove the event listener when the component is unmounted
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
    
    return (
        <div id="main-bounds" className="h-screen w-screen relative p-4">
            <div ref={containerRef} className='flex'>
                {draggableItems.map((item, index) => (
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
                                e.stopPropagation();  // Prevent the event from propagating to the document
                                if (selectedItem === index) {
                                    setSelectedItem(null);
                                } else {
                                    setSelectedItem(index);
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
                ))}
            </div>
            {browsers.map((browser, index) => (
                <Draggable 
                    key={index} 
                    bounds="#main-bounds" 
                    handle=".drag-handle" 
                    onStart={() => setActiveBrowser(browser.zIndex)}
                >
                    <div 
                        className={`absolute`} 
                        style={{ zIndex: activeBrowser === browser.zIndex ? 10 : 1, position: 'absolute', left: browser.positionleft, top: browser.positiontop, right: browser.positionright }}
                    >
                        <Browser bgColor={browser.bgColor} secondaryColor={browser.secondaryColor} bHeight={browser.bHeight} bWidth={browser.bWidth} hHeight={browser.hHeight}>
                            {browser.content}
                        </Browser>
                    </div>
                </Draggable>
            ))}

            <Draggable 
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
            </Draggable>
        </div>
    );
}

export default Browsers;

