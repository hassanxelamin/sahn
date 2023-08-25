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
            <div className="w-1/3 bg-gray-100 border-r py-4">
                <ul>
                    {files.map(file => (
                        <li 
                            key={file.name} 
                            className={`cursor-pointer p-4 ${selectedFile?.name === file.name ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                            onClick={() => setSelectedFile(file)}
                        >
                            {file.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full h-full">
                {selectedFile && (
                    <iframe
                        className='w-full h-full'
                        src={`https://www.youtube.com/embed/${selectedFile.videoId}?si=OPqpRWD1jfsgIlRv`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                )}
            </div>
        </div>
    )
}

export default FileExplorer;

