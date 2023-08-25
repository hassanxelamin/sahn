// draggableData.tsx

import React from 'react';
import VideoPlayer from '@/src/components/video-player/video-player';
import FileExplorer from '@/src/components/browser/file-explorer';
import Chat from '@/src/components/chat/chat';

export const draggableItems = [
    {
        positionleft: '557px',
        positiontop: '200px',
        iconSrc: '/icons/folder.svg',
        iconAlt: 'folder icon',
        labelText: 'ABOUT'
    },
    {
        positionright: '357px',
        positionbottom: '200px',
        iconSrc: '/icons/folder.svg',
        iconAlt: 'folder icon',
        labelText: 'MUSIC'
    }
    // ... add other draggable items as needed
];

export const browsers = [
    {
        positionleft: '257px',
        positiontop: '341px',
        zIndex: 1,
        content: <FileExplorer />,
        bgColor: "#BFC2C8",
        secondaryColor: "#FFF",
        bWidth: "845px", 
        bHeight: "480px",
        hHeight: "52px",
    },
    // {
    //     positionleft: '257px',
    //     positiontop: '341px',
    //     zIndex: 1,
    //     content: <VideoPlayer src="/images/sahnny.png" src10="/images/sahnny.png" />,
    //     bgColor: "#BFC2C8",
    //     secondaryColor: "#FFF",
    //     bWidth: "532px", 
    //     bHeight: "600px",
    //     hHeight: "52px",
    // },
    {
        positionleft: '748px',
        positiontop: '497px',
        zIndex: 2,
        content: (
            <iframe 
                width="100%" 
                height="300" 
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay" 
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1286105872&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
            </iframe>
        ),
        bgColor: "#BFC2C8",
        secondaryColor: "#FFF",
        bWidth: "532px", 
        bHeight: "354px",
        hHeight: "52px",
    },
    {
        positionright: '510px',
        positiontop: '164px',
        zIndex: 3,
        content: <Chat />,
        bgColor: "#000",
        secondaryColor: "#000",
        bWidth: "532px", 
        bHeight: "354px",
        hHeight: "52px",
    },
];
