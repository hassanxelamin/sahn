import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { height } from './anim';
import 'shader-doodle'; // Assuming you've installed shader-doodle as a package

const shaderCode = `

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

#define time iTime
#define resolution ( iResolution.xy )
#define PI 3.14159265

uniform sampler2D u_texture0;
uniform float staticStrength;

float noise(vec2 P) {
    vec2 Pi = floor(P);
    vec2 Pf = P - Pi;
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash = fract(Pt * (1.0 / 951.135664));
    vec2 blend = Pf * Pf * Pf * (Pf * (Pf * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(hash, blend2.zxzx * blend2.wwyy);
}

float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 tex2D(sampler2D tex, vec2 uv) {
vec3 col = texture2D(tex, uv).xyz;
if(abs(uv.x - 0.5) > 0.5) {
    col = vec3(0.1);
}
return col;
}

vec3 scanLine(float uv, float pixels, float opacity) {
float intensity = (0.5 * sin(uv * pixels * PI * 2.) + 0.5) * 0.9 + 0.05;
return vec3(pow(intensity, opacity));
}

void main() {
vec2 uv = gl_FragCoord.xy / resolution;
vec2 uvn = uv;
vec3 col = vec3(0.0);

float waveFrequency = 15.;
float waveTimescale = 50.;
float waveAmplitude = 0.002;
uvn.x += (noise(vec2(uvn.y * waveFrequency, time * waveTimescale)) - 0.5) * waveAmplitude;

// tape crease
float tcPhase = clamp((sin(uvn.y * 8.0 - time * PI * 1.2) - 0.92) * noise(vec2(time)), 0.0, 0.01) * 10.0;
float tcNoise = max(noise(vec2(uvn.y * 100.0, time * 10.0)) - 0.5, 0.0);
uvn.x = uvn.x - tcNoise * tcPhase;

float distortionStart = clamp(sin(time * 0.1), 0.001, 0.01);
float switchingNoisePhase = smoothstep(distortionStart, 0.0, uvn.y);
uvn.y += switchingNoisePhase * 0.1;
uvn.x += switchingNoisePhase * (noise(vec2(uv.y * 100.0, time * 10.0)) - 0.5) * 0.2;
col = tex2D(u_texture0, uvn);
col = mix(col, col.gbr, switchingNoisePhase);

float staticColor = rand(uv + iTime);
staticColor *= staticStrength * 0.2;
col += vec3(staticColor);

float lineCount = 100.0;
float timeScale = 5.;
col *= mix(0.9, 1., step(fract(uv.y * lineCount - time * timeScale), 0.5));

vec3 doublingDistance = vec3(0.001, 0.003, 0.002);
vec3 doubling = vec3(0.);
for(float delta = -4.; delta < 2.; delta += 1.) {
    doubling += vec3(
    tex2D(u_texture0, uvn + vec2(delta, 0.0) * doublingDistance.r).r, 
    tex2D(u_texture0, uvn + vec2(delta + 2.0, 0.0) * doublingDistance.g).g, 
    tex2D(u_texture0, uvn + vec2(delta - 4.0, 0.0) * doublingDistance.b).b) 
    * 0.1;
}
float bloomDim = 0.6;
col = (col + doubling) * bloomDim;

col *= scanLine(uv.x, iResolution.x * 0.5, 0.2);
col *= scanLine(uv.y, iResolution.y * 0.5, 0.2);
col *= 1.5;
col *= 1.0 + clamp(noise(vec2(0.0, uv.y + time)) * 0.6 - 0.25, 0.0, 0.1);
gl_FragColor = vec4(col, 1.0);
}
`;


export default function Preloader() {
  return (
    <div className="relative w-screen h-screen fixed top-0 left-0 z-40 text-white flex items-center justify-center font-sk">

      {/* Preloader Content */}
      {
        [...Array(5)].map( (_, index) => {
            return (
                <motion.div 
                    variants={height} 
                    initial="initial"
                    animate="enter"
                    custom={4 - index} 
                    className="w-1/5 h-full flex items-center bg-black justify-center relative crt"
                    key={index}
                >
                    {index === 2 && 
                        <div className="w-full text-center text-[15px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            WELCOME
                        </div>
                    }
                </motion.div>
            );
        })
      }

      {/* Shader Effect */}
      {/* <div className="absolute top-0 left-0 w-screen h-screen z-50">
        <shader-doodle shadertoy="" className="">
            <sd-texture src="#unprocessed-canvas" force-update="" name="u_texture0"></sd-texture> 
            <sd-uniform name="staticStrength" x="0"></sd-uniform> 
            <script type="x-shader/x-fragment">
                {shaderCode}
            </script>
        </shader-doodle>
      </div> */}

    </div>
  )
}
