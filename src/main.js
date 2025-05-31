// main.js
import * as THREE from 'three';
import { createIndividuals } from './individuals.js';
import { updateIndividuals } from './interaction.js';
import { GUI } from 'dat.gui';
import { setupControls } from './controls.js';
import { setupInstructions } from './instructions.js';

let scene, camera, renderer, individuals, controls, room, gui;
let particleCount = 20;
let animationSpeed = 1.0;
let clock = new THREE.Clock();

// GUI parameters
const params = {
  interactionDistance: 3,
  socialContactRate: 1,
  cooldownRate: 0.5,
  releaseForce: 2,
  animationSpeed: 1.0,
  particleIntensity: 1.0
};

// Particle count input
function setupParticleInput() {
  let label = document.createElement('label');
  label.id = 'particle-count-input-label';
  label.textContent = 'Particles:';
  label.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    color: white;
    font-family: Arial, sans-serif;
    font-size: 14px;
    z-index: 1000;
    text-shadow: 0 0 4px #000;
  `;
  
  let input = document.createElement('input');
  input.type = 'number';
  input.id = 'particle-count-input';
  input.value = particleCount;
  input.min = 1;
  input.max = 200;
  input.step = 1;
  input.style.cssText = `
    position: fixed;
    top: 30px;
    left: 10px;
    width: 80px;
    padding: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    z-index: 1000;
  `;
  input.onchange = (e) => {
    particleCount = parseInt(input.value) || 1;
    resetIndividuals();
  };
  document.body.appendChild(label);
  document.body.appendChild(input);
}

// Setup title that auto-hides after 15 seconds
function setupTitle() {
  const title = document.createElement('div');
  title.id = 'main-title';
  title.textContent = 'Social Pressure Build Up';
  title.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20%;
    color: #ffffff;
    font-family: 'Arial', sans-serif;
    font-size: 1.5em;
    font-weight: bold;
    z-index: 999;
    text-shadow: 
      0 0 10px rgba(255, 255, 255, 0.8),
      0 0 20px rgba(255, 255, 255, 0.6),
      0 0 30px rgba(255, 255, 255, 0.4),
      2px 2px 4px rgba(0, 0, 0, 0.8);
    opacity: 1;
    transition: opacity 1s ease-out;
    pointer-events: none;
    text-align: center;
    letter-spacing: 2px;
  `;
  
  document.body.appendChild(title);
  
  // Auto-hide after 15 seconds with fade out effect
  setTimeout(() => {
    title.style.opacity = '0';
    // Remove from DOM after fade out completes
    setTimeout(() => {
      if (title.parentNode) {
        title.parentNode.removeChild(title);
      }
    }, 1000); // Wait for 1s transition to complete
  }, 15000); // Hide after 15 seconds
  
  console.log('Title created and will auto-hide after 15 seconds');
}

// Setup GUI
function setupGUI() {
  console.log('Setting up GUI...');
  gui = new GUI({ autoPlace: false });
  
  // Position GUI in top right
  gui.domElement.style.position = 'fixed';
  gui.domElement.style.top = '10px';
  gui.domElement.style.right = '10px';
  gui.domElement.style.zIndex = '1000';
  gui.domElement.style.backgroundColor = 'rgba(0,0,0,0.8)';
  gui.domElement.style.border = '1px solid rgba(255,255,255,0.3)';
  gui.domElement.style.borderRadius = '4px';
  
  console.log('GUI created, adding controls...');
  
  // Animation controls folder
  const animationFolder = gui.addFolder('Animation');
  animationFolder.add(params, 'animationSpeed', 0.1, 3.0).name('Speed').onChange((value) => {
    animationSpeed = value;
    console.log('Animation speed changed to:', value);
  });
  animationFolder.add(params, 'particleIntensity', 0.1, 2.0).name('Particle Intensity').onChange((value) => {
    console.log('Particle intensity changed to:', value);
  });
  animationFolder.open();
  
  // Physics controls folder
  const physicsFolder = gui.addFolder('Physics');
  physicsFolder.add(params, 'interactionDistance', 1, 10).name('Interaction Distance');
  physicsFolder.add(params, 'socialContactRate', 0.1, 5).name('Contact Rate');
  physicsFolder.add(params, 'cooldownRate', 0.1, 2).name('Cooldown Rate');
  physicsFolder.add(params, 'releaseForce', 0.1, 5).name('Release Force');
  physicsFolder.open();
  
  // Append to body
  document.body.appendChild(gui.domElement);
  console.log('GUI appended to body. Element:', gui.domElement);
  console.log('GUI position:', gui.domElement.style.position, gui.domElement.style.top, gui.domElement.style.right);
}

function resetIndividuals() {
  // Remove old individuals from scene
  if (individuals) {
    for (const obj of individuals) scene.remove(obj);
  }
  individuals = createIndividuals(particleCount, scene);
}

// Function to get canvas dimensions accounting for instructions bar
function getCanvasDimensions() {
  const instructionsBar = document.getElementById('instructions-bar');
  const barHeight = instructionsBar ? instructionsBar.offsetHeight : 40; // Default height if not found
  return {
    width: window.innerWidth,
    height: window.innerHeight - barHeight
  };
}

init();
animate();

function init() {
  scene = new THREE.Scene();
  
  const canvasDimensions = getCanvasDimensions();
  camera = new THREE.PerspectiveCamera(
    75,
    canvasDimensions.width / canvasDimensions.height,
    0.1,
    1000
  );
  camera.position.z = 30;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(canvasDimensions.width, canvasDimensions.height);
  renderer.domElement.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  `;
  document.body.insertBefore(renderer.domElement, document.body.firstChild);

  // Create individuals
  individuals = createIndividuals(particleCount, scene);

  // Ambient light
  const light = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(light);

  // Add grid and axes helpers for 3D reference
  scene.add(new THREE.GridHelper(40, 40));
  scene.add(new THREE.AxesHelper(10));

  // Add a giant wireframe cube room
  const roomSize = 18;
  const roomGeometry = new THREE.BoxGeometry(roomSize * 2, roomSize * 2, roomSize * 2);
  const roomMaterial = new THREE.MeshBasicMaterial({ color: 0x8888ff, wireframe: true, transparent: true, opacity: 0.3 });
  room = new THREE.Mesh(roomGeometry, roomMaterial);
  scene.add(room);

  // Setup controls
  controls = setupControls(camera, renderer);

  // Setup instructions overlay and prompt
  setupInstructions();

  // Setup particle count input
  setupParticleInput();

  // Setup GUI (after DOM is ready)
  setupGUI();

  // Setup title
  setupTitle();
}

function animate() {
  requestAnimationFrame(animate);

  // Get delta time and apply animation speed multiplier
  const delta = clock.getDelta() * animationSpeed;

  // Update simulation logic with modified params for intensity
  const modifiedParams = {
    ...params,
    // Scale certain parameters by particle intensity
    socialContactRate: params.socialContactRate * params.particleIntensity,
    releaseForce: params.releaseForce * params.particleIntensity
  };
  
  updateIndividuals(individuals, scene, modifiedParams, delta);

  // Update controls (pass delta if needed)
  if (controls && controls.update) controls.update();

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  const canvasDimensions = getCanvasDimensions();
  camera.aspect = canvasDimensions.width / canvasDimensions.height;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasDimensions.width, canvasDimensions.height);
});
