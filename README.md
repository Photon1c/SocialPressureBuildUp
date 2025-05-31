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
cd social-conflict-visualizer
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
   - Base directory: `samples/socialconflict/social-conflict-visualizer`
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

## 🎯 Features
- Interactive 3D visualization of social pressure dynamics
- Real-time particle simulation with pressure build-up
- Dynamic visual effects including particle glow and color transitions
- Adjustable simulation parameters through intuitive GUI controls
- Dual camera modes (Orbit and FPS) for different viewing perspectives
- Particle count control for scaling simulation complexity
- Auto-hiding title and instructions overlay
- Responsive design that adapts to different screen sizes

## 💥 Social Pressure Build-Up in the Simulation

This visualization demonstrates how social pressure accumulates and releases in group dynamics. Each particle represents an individual in a social space, with their interactions creating a dynamic system of pressure build-up and release.

### 🔬 Simulation Mechanics
- **Pressure Build-up**: Particles accumulate pressure when they come close to each other
- **Visual Feedback**: Color transitions from blue to red indicate increasing pressure
- **Release Mechanism**: When pressure exceeds threshold, particles "explode" with force
- **Glow Effects**: Particles emit light based on their pressure level
- **Dynamic Scaling**: Particle size changes with pressure and intensity
- **Room Boundaries**: Particles bounce off the wireframe room walls

### 🎮 Controls

#### Camera Controls
- **Orbit Mode** (Default):
  - Left Mouse Button: Rotate view
  - Right Mouse Button: Pan
  - Mouse Wheel: Zoom in/out
- **FPS Mode** (Press V to toggle):
  - W/Up Arrow: Move forward
  - S/Down Arrow: Move backward
  - A/Left Arrow: Move right (inverted)
  - D/Right Arrow: Move left (inverted)
  - Mouse: Look around

#### UI Controls
- **I Key**: Show/hide instructions overlay
- **V Key**: Toggle between FPS and Orbit camera modes
- **H Key**: Toggle help overlay
- **Esc**: Close instructions overlay

#### Simulation Controls (Top-Right GUI)
- **Animation Folder**:
  - Speed: Adjust simulation speed (0.1x - 3.0x)
  - Particle Intensity: Control visual effects intensity (0.1x - 2.0x)
- **Physics Folder**:
  - Interaction Distance: How close particles need to be to interact
  - Contact Rate: How fast pressure builds up
  - Cooldown Rate: How fast pressure decreases
  - Release Force: Explosion force when pressure threshold is reached

#### Particle Count (Top-Left)
- Input field to adjust number of particles (1-200)

### 🎨 Visual Effects
- **Dynamic Colors**: Smooth transitions from blue (calm) to red (high pressure)
- **Glow Effects**: Particles emit light based on pressure level
- **Size Scaling**: Particles grow with pressure and intensity
- **Explosion Effects**: Dramatic visual feedback when pressure releases
- **Wireframe Room**: Provides spatial context and boundaries
- **Grid and Axes**: Help with spatial orientation

### 🛠️ Technologies Used
- Three.js for 3D rendering
- Vite for build tooling
- dat.GUI for parameter controls
- JavaScript for simulation logic
- HTML5 & CSS3 for UI
- OrbitControls for camera manipulation

### 📝 License
MIT License - feel free to use this project for your own purposes!

### 👥 Contributing
Contributions are welcome! Please feel free to submit a Pull Request. 
