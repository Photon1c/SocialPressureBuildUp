// individuals.js
import * as THREE from 'three';

export function createIndividuals(count, scene) {
  const individuals = [];
  for (let i = 0; i < count; i++) {
    const geom = new THREE.SphereGeometry(1, 16, 16);
    const mat = new THREE.MeshPhongMaterial({ color: 0x3399ff });
    const sphere = new THREE.Mesh(geom, mat);

    sphere.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    );

    sphere.velocity = new THREE.Vector3();
    sphere.pressure = 0;
    sphere.threshold = 5 + Math.random() * 3; // Random threshold

    individuals.push(sphere);
    scene.add(sphere);
  }
  return individuals;
}
