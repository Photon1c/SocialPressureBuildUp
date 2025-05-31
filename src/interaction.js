// interaction.js
import * as THREE from 'three';

const interactionDistance = 3;
const socialContactRate = 1;
const cooldownRate = 0.5;
const releaseForce = 2;

// interaction.js
export function updateIndividuals(individuals, scene, params) {
    individuals.forEach((indiv, i) => {
      individuals.forEach((other, j) => {
        if (i !== j) {
          const dist = indiv.position.distanceTo(other.position);
          if (dist < params.interactionDistance) {
            indiv.pressure += params.socialContactRate * 0.01;
          }
        }
      });
  
      if (indiv.pressure >= indiv.threshold) {
        indiv.material.color.set(0xff0000);
        indiv.velocity.add(new THREE.Vector3(
          (Math.random() - 0.5) * params.releaseForce,
          (Math.random() - 0.5) * params.releaseForce,
          (Math.random() - 0.5) * params.releaseForce
        ));
        indiv.pressure = 0;
      } else {
        const color = new THREE.Color();
        color.setHSL(0.6 - 0.6 * (indiv.pressure / indiv.threshold), 1, 0.5);
        indiv.material.color.copy(color);
      }
  
      indiv.pressure -= params.cooldownRate * 0.01;
      indiv.pressure = Math.max(0, indiv.pressure);
  
      indiv.position.add(indiv.velocity);
      indiv.velocity.multiplyScalar(0.95);
    });
  }
  
