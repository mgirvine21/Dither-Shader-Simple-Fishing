# Simple-Fishing - Reactive 3D Scene with Custom Dithering Shader

An interactive 3D scene built in **p5.js** featuring custom GLSL shaders, 
procedural noise, and a hand-crafted dithering effect applied to low-poly 3D models.

## Overview

This project is a stylized pond scene under the moon, combining 
low-poly geometry with a custom fragment shader to achieve a retro, pixelated 
aesthetic. This was a project to simulate how light hits surfaces and translating that into a blocky, 
quantized shading style reminiscent of early 3D games.

## Features

- Custom GLSL dithering shader applied to 3D geometry in p5.js
- Gradient noise based on IQ's noise algorithm from The Book of Shaders, 
  adapted for 3D surface coloring
- All original models: wahoo fish, lily pads, cattails, and a pond surface.
- Orbital camera control for viewing the scene from multiple angles

## Tech Stack

- p5.js (WEBGL mode)
- GLSL (fragment + vertex shaders)

## Background

This project evolved through two assignment iterations. The first pass 
focused on applying procedural noise to a 3D model's surface color — 
exploring what a low-poly fish might look like underwater with gradient 
noise distorting its hues. The second pass tackled the dithering shader 
I'd originally envisioned for a pixel-like look.

The final scene brings both together in a cohesive environment.

## Running on github pages or p5.js
