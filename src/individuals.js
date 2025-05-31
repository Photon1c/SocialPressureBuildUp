// individuals.js
import * as THREE from 'three';

export function createIndividuals(count, scene) {
  const individuals = [];
  for (let i = 0; i < count; i++) {
    const geom = new THREE.SphereGeometry(1, 16, 16);
    
    // Enhanced material for better visual effects
    const mat = new THREE.MeshPhongMaterial({ 
      color: 0x3399ff,
      emissive: 0x001133, // Slight glow
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    
    const sphere = new THREE.Mesh(geom, mat);

    sphere.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    );

    sphere.velocity = new THREE.Vector3();
    sphere.pressure = 0;
    sphere.threshold = 5 + Math.random() * 3; // Random threshold
    
    // Add glow effect for high intensity
    const glowGeometry = new THREE.SphereGeometry(1.2, 8, 8);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x3399ff,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    sphere.add(glow);
    sphere.glowEffect = glow;

    individuals.push(sphere);
    scene.add(sphere);
  }
  return individuals;
}
