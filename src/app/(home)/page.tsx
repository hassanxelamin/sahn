'use client'

import { useEffect, useState } from 'react';
import TypeIt from 'typeit';
import Browsers from '@/src/components/browser/browsers';
import Taskbar from '@/src/components/taskbar/taskbar';
import Preloader from '@/src/components/preloader/preloader';
import { AnimatePresence } from 'framer-motion';
import Script from 'next/script';
// import 'shader-doodle';
import Topbar from '@/src/components/top-bar/top-bar';


// const shaderCode = `

// #ifdef GL_FRAGMENT_PRECISION_HIGH
// precision highp float;
// #else
// precision mediump float;
// #endif

// #define time iTime
// #define resolution ( iResolution.xy )
// #define PI 3.14159265

// uniform sampler2D u_texture0;
// uniform float staticStrength;

// float noise(vec2 P) {
//     vec2 Pi = floor(P);
//     vec2 Pf = P - Pi;
//     vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
//     Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
//     Pt += vec2(26.0, 161.0).xyxy;
//     Pt *= Pt;
//     Pt = Pt.xzxz * Pt.yyww;
//     vec4 hash = fract(Pt * (1.0 / 951.135664));
//     vec2 blend = Pf * Pf * Pf * (Pf * (Pf * 6.0 - 15.0) + 10.0);
//     vec4 blend2 = vec4(blend, vec2(1.0 - blend));
//     return dot(hash, blend2.zxzx * blend2.wwyy);
// }

// float rand(vec2 co) {
//     return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
// }

// vec3 tex2D(sampler2D tex, vec2 uv) {
// vec3 col = texture2D(tex, uv).xyz;
// if(abs(uv.x - 0.5) > 0.5) {
//     col = vec3(0.1);
// }
// return col;
// }

// vec3 scanLine(float uv, float pixels, float opacity) {
// float intensity = (0.5 * sin(uv * pixels * PI * 2.) + 0.5) * 0.9 + 0.05;
// return vec3(pow(intensity, opacity));
// }

// void main() {
//   vec2 uv = gl_FragCoord.xy / iResolution.xy;
//   vec3 col = texture2D(u_texture0, uv).xyz;
//   gl_FragColor = vec4(col, 1.0);
// }
// `;

// bg-neutral-200
export default function Home() {
  // const [isLoading, setIsLoading] = useState(true);
  
  // useEffect(() => {
  //   (
  //     async () => {
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 1000)
  //     }
  //   )()
  // }, [])


// useEffect(() => {
//     // Initialize TypeIt
//     new TypeIt("#typeit-output", {
//         strings: ["WELCOME"],
//         speed: 80,
//         cursor: false
//     }).go();

//     // Set up the observer
//     const observer = new MutationObserver(() => {
//       const text = document.getElementById('typeit-output').innerText;
//       const canvas = document.getElementById("unprocessed-canvas");
          
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
  
//       let ctx = canvas.getContext("2d");
//       // ctx.imageSmoothingQuality = "high";
//       // ctx.imageSmoothingEnabled = false;
          
//       // Scale font size for clarity
//       ctx.font = `${60}px VCR`; // Adjusted for demonstration
//       ctx.fillStyle = "white";
          
//       // Measure text width for centering
//       const metrics = ctx.measureText(text);
          
//       // Calculate x and y to center the text
//       const x = (canvas.width - metrics.width) / 2;
//       const y = (canvas.height + 60 /* font height adjusted */) / 2;
          
//       // Clear the entire canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
          
//       // Draw the text on the canvas
//       ctx.fillText(text, x, y);
//   });
  

//     const config = {
//         childList: true,
//         subtree: true
//     };

//     observer.observe(document.getElementById('typeit-output'), config);

//     return () => observer.disconnect();
// }, []);


  
  return (
    <main className="h-screen w-screen bg-neutral-200 relative">
      {/* <AnimatePresence mode="wait">
      {
        isLoading && (
          <div className="w-full h-full fixed inset-0 z-50">
            <Preloader />
          </div>
        )
      }
      </AnimatePresence> */}
        <div className='w-screen h-screen relative'>
          <Topbar />
          {/* <Browsers /> */}
          {/* <Taskbar /> */}
        </div>

    {/* <div id="shader-doodle-container" className="fixed inset-0 z-50 bg-black">
        <div>
          <div id="typeit-output" className="hidden text-white"></div>
          <canvas style={{ position:"absolute", left:"0", top:"0", width:"100%", height:"100%", zIndex:"2"}} id="unprocessed-canvas" className='hidden'></canvas>
        </div>
        <div></div> */}
          {/* Shader Effect */}
        {/* <shader-doodle style={{ position:"fixed", left:"0", top:"0", right:"0", bottom:"0", width:"100%", height:"100%", zIndex:"2" }} shadertoy >
            <sd-texture src="#unprocessed-canvas" force-update name="u_texture0"></sd-texture> 
            <sd-uniform name="staticStrength" x="0"></sd-uniform> 
            <script type="x-shader/x-fragment">
                {shaderCode}
            </script>
        </shader-doodle> */}
    {/* </div> */}
    </main>
  )
}
