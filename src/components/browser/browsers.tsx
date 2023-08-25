'use client'

import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Browser from '@/src/components/browser/browser';
import SingleBrowser from '@/src/components/browser/single-browser';
import FileIcon from './icon';
import { draggableItems, browsers } from '@/src/constants/ui';

const Browsers = () => {
    const [activeBrowser, setActiveBrowser] = useState<number | null>(null);
    
    return (
        <div id="main-bounds" className="h-screen w-screen relative">
            {draggableItems.map((item, index) => (
                <Draggable key={index} bounds="#main-bounds">
                    <div className={`cursor-grab absolute`}
                        style={{ position: 'absolute', left: item.positionleft, top: item.positiontop, right: item.positionright, bottom: item.positionbottom }}
                    >
                        <FileIcon 
                            iconSrc={item.iconSrc}
                            iconAlt={item.iconAlt}
                            labelText={item.labelText}
                        />
                    </div>
                </Draggable>
            ))}

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

