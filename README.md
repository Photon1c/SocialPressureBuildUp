# 🎮 Social Conflict Visualizer

## 🚀 Deployment Guide

This app is [live here](https://socialpressurebuildup.netlify.app/)

### 📦 Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git

### 🛠️ Local Development Setup
1. Clone the repository:
```bash
git clone https://github.com/Photon1c/SocialPressureBuildUp
cd SocialPressureBuildUp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### 🌐 Deployment Options

#### Option 1: Deploy to Netlify (Recommended) 🚀
1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Deploy settings:
   - Base directory: `.` (root directory)
   - Package directory: (leave blank)
   - Build command: npm run build
   - Publish directory: `.` dist
   - Functions directory: (leave blank)
6. Click "Deploy site"

Netlify will serve your app directly from the project root. If you add a build step in the future, update the build command and publish directory accordingly.

#### Option 2: Deploy to GitHub Pages 📚
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select your main branch as source
4. Click Save

## 🎯 Features
- Interactive 3D visualization
- Mouse controls for navigation
- Real-time conflict simulation
- Dynamic scoreboard
- Player color indicators

## 💥 Social Pressure Build-Up in the Simulation

In this simulation, "social pressure" is visualized as the dynamic interactions and proximity between agents (such as players, objects, or simulated individuals). As agents move closer or interact, invisible forces accumulate—representing the build-up of tension, competition, or cooperation. When this pressure exceeds a certain threshold, it can trigger visible events such as sudden movements, color changes, or simulated "conflicts" (like objects being pushed apart or clustering together). This mechanic models how social environments can become unstable or volatile as pressure builds, and how release mechanisms (like movement, separation, or resolution) restore balance.

### 🎮 Controls
- Left Mouse Button: Rotate view
- Right Mouse Button: Pan
- Mouse Wheel: Zoom in/out
- H Key: Toggle help overlay
- V Key: Toggle between FPS and Orbit camera controls
- I Key: Show/hide instructions overlay

### 🛠️ Technologies Used
- Three.js for 3D rendering
- JavaScript for simulation logic
- HTML5 & CSS3 for UI
- OrbitControls for camera manipulation

### 📝 License
MIT License - feel free to use this project for your own purposes!

### 👥 Contributing
Contributions are welcome! Please feel free to submit a Pull Request. 
