import * as THREE from 'three';

// Import OrbitControls from three/examples if available, else use a local copy
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let controls, fpsMode = false;

export function setupControls(camera, renderer) {
  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.enableRotate = true;

  // FPS mode variables
  let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
  let velocity = new THREE.Vector3();
  let direction = new THREE.Vector3();

  function onKeyDown(event) {
    switch (event.code) {
      case 'KeyV':
        fpsMode = !fpsMode;
        controls.enabled = !fpsMode;
        break;
      case 'ArrowUp':
      case 'KeyW':
        moveForward = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        moveLeft = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        moveBackward = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        moveRight = true;
        break;
    }
  }
  function onKeyUp(event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        moveForward = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        moveLeft = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        moveBackward = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        moveRight = false;
        break;
    }
  }

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  function update(delta) {
    if (fpsMode) {
      // Simple FPS movement
      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveLeft) - Number(moveRight);
      direction.normalize();
      if (moveForward || moveBackward) velocity.z -= direction.z * 0.1;
      if (moveLeft || moveRight) velocity.x -= direction.x * 0.1;
      camera.position.add(velocity);
      velocity.multiplyScalar(0.8);
    } else {
      controls.update();
    }
  }

  return {
    update,
    isFPS: () => fpsMode,
    setMode: (mode) => { fpsMode = mode; controls.enabled = !mode; }
  };
} 