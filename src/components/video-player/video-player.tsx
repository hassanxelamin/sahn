'use client'

import { useRef, useState, useEffect } from 'react';
import NextImage from 'next/image';

export default function VideoPlayer({src, src10}: any) {
  const [dimension, setDimension] = useState({width: 0, height: 0});
  const [imageOpacity, setImageOpacity] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false); 
  const canvas = useRef(null);

  // Start the animation when startAnimation is true
  useEffect(() => {
    if(startAnimation && dimension.width > 0){
      const image = new Image();
      image.onload = () => {
        setTimeout(() => {
          setImageOpacity(0);
          animate(image);
        }, 150);
      }
      image.src = src;
    }
  }, [startAnimation, dimension]);

  const handleClick = () => {
    setStartAnimation(true);
  };

  const drawImage = (image: any) => {
    const ctx = canvas.current.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(image, 0, 0, dimension.width, dimension.height);
  }

  const animate = (image, size=20) => {
    drawImage(image);
    if(size < 5) {
      setShowVideo(true);  // Show video once pixelation completes
      return;
    }

    const w = dimension.width;
    const h = dimension.height;
    const ctx = canvas.current.getContext("2d", {willReadFrequently: true});
    const pixelArr = ctx.getImageData(0, 0, w, h).data;
    for (let y = 0; y < h; y += size) {
      for (let x = 0; x < w; x += size) {
        let pos = (x + y * w) * 4;
        ctx.fillStyle = "rgba(" + pixelArr[pos] + "," + pixelArr[pos + 1] + "," + pixelArr[pos + 2] + "," + pixelArr[pos + 3] + ")";
        ctx.fillRect(x, y, size, size);
      }
    }

    setTimeout(() => {
        animate(image, size/2);
    }, 150)
  }

  return (
    <div className="relative w-full" onClick={handleClick}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/kXcANgpSH0g?si=OPqpRWD1jfsgIlRv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  );
}