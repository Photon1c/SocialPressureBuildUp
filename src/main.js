// main.js
import * as THREE from 'three';
import { createIndividuals } from './individuals.js';
import { updateIndividuals } from './interaction.js';
import { GUI } from 'dat.gui';

let scene, camera, renderer, individuals;

// GUI parameters
const params = {
  interactionDistance: 3,
  socialContactRate: 1,
  cooldownRate: 0.5,
  releaseForce: 2
};

// Setup GUI
const gui = new GUI();


gui.add(params, 'interactionDistance', 1, 10).name('Interaction Distance');
gui.add(params, 'socialContactRate', 0.1, 5).name('Contact Rate');
gui.add(params, 'cooldownRate', 0.1, 2).name('Cooldown Rate');
gui.add(params, 'releaseForce', 0.1, 5).name('Release Force');

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create individuals
  individuals = createIndividuals(20, scene);

  // Ambient light
  const light = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(light);
}

function animate() {
  requestAnimationFrame(animate);

  // Update simulation logic
  updateIndividuals(individuals, scene, params);

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
