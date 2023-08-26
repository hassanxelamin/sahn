import React, { useState } from 'react';

interface File {
    name: string;
    videoId: string;  // YouTube video ID
}

const FileExplorer: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const files: File[] = [
        { name: "Video 1", videoId: "dQw4w9WgXcQ" }, 
        { name: "Video 2", videoId: "ytVideoID2" },
        // ... add more video files as needed
    ];

    return (
        <div className="flex w-full h-full">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/kXcANgpSH0g?si=OPqpRWD1jfsgIlRv" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
    )
}

export default FileExplorer;

