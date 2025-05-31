// interaction.js
import * as THREE from 'three';

const interactionDistance = 3;
const socialContactRate = 1;
const cooldownRate = 0.5;
const releaseForce = 2;
const stickiness = 0.05; // Coupling factor for attraction
const minDistance = 2; // Minimum allowed distance between spheres
const roomSize = 18; // Half-size of the cube room (cube is 36x36x36)

// interaction.js
export function updateIndividuals(individuals, scene, params, deltaTime = 0.016) {
  // Use deltaTime for frame-rate independent animation
  const timeMultiplier = deltaTime * 60; // Normalize to 60fps baseline
  
  for (let i = 0; i < individuals.length; i++) {
    let indiv = individuals[i];
    let force = new THREE.Vector3();
    for (let j = 0; j < individuals.length; j++) {
      if (i === j) continue;
      let other = individuals[j];
      let dir = new THREE.Vector3().subVectors(other.position, indiv.position);
      let dist = dir.length();
      if (dist < params.interactionDistance) {
        indiv.pressure += params.socialContactRate * 0.01 * timeMultiplier;
      }
      // Stickiness: attract if not too close, repel if overlapping
      if (dist > minDistance && dist < params.interactionDistance * 2) {
        dir.normalize();
        force.add(dir.multiplyScalar(stickiness * timeMultiplier));
      } else if (dist < minDistance) {
        // Repel strongly if too close
        dir.normalize();
        force.add(dir.multiplyScalar(-stickiness * 2 * timeMultiplier));
      }
    }
    indiv.velocity.add(force);

    const intensityMultiplier = params.particleIntensity || 1.0;

    if (indiv.pressure >= indiv.threshold) {
      indiv.material.color.set(0xff0000);
      
      // Enhanced particle intensity affects explosion force and visual effects
      indiv.velocity.add(new THREE.Vector3(
        (Math.random() - 0.5) * params.releaseForce * intensityMultiplier,
        (Math.random() - 0.5) * params.releaseForce * intensityMultiplier,
        (Math.random() - 0.5) * params.releaseForce * intensityMultiplier
      ));
      
      // Scale particle size based on intensity
      const baseScale = 1.0;
      const intensityScale = baseScale + (intensityMultiplier - 1.0) * 0.5;
      indiv.scale.setScalar(intensityScale * 1.2); // Larger when exploding
      
      // Enhance glow effect during explosion
      if (indiv.glowEffect) {
        indiv.glowEffect.material.opacity = 0.3 * intensityMultiplier;
        indiv.glowEffect.material.color.set(0xff4444);
      }
      
      // Enhanced emissive glow
      indiv.material.emissive.setHex(0x441111);
      
      indiv.pressure = 0;
    } else {
      const color = new THREE.Color();
      
      // Enhanced color intensity based on particle intensity
      const hue = 0.6 - 0.6 * (indiv.pressure / indiv.threshold);
      const saturation = Math.min(1.0, intensityMultiplier);
      const lightness = 0.5 * intensityMultiplier;
      
      color.setHSL(hue, saturation, lightness);
      indiv.material.color.copy(color);
      
      // Scale particle size based on pressure and intensity
      const baseScale = 1.0;
      const pressureScale = 1.0 + (indiv.pressure / indiv.threshold) * 0.3;
      const intensityScale = baseScale + (intensityMultiplier - 1.0) * 0.3;
      indiv.scale.setScalar(pressureScale * intensityScale);
      
      // Update glow effect based on pressure and intensity
      if (indiv.glowEffect) {
        const glowIntensity = (indiv.pressure / indiv.threshold) * 0.2 * intensityMultiplier;
        indiv.glowEffect.material.opacity = glowIntensity;
        indiv.glowEffect.material.color.copy(color);
      }
      
      // Update emissive based on pressure and intensity
      const emissiveIntensity = (indiv.pressure / indiv.threshold) * intensityMultiplier * 0.3;
      const emissiveColor = color.clone().multiplyScalar(emissiveIntensity);
      indiv.material.emissive.copy(emissiveColor);
    }

    indiv.pressure -= params.cooldownRate * 0.01 * timeMultiplier;
    indiv.pressure = Math.max(0, indiv.pressure);

    // Apply time-based movement
    const movement = indiv.velocity.clone().multiplyScalar(timeMultiplier);
    indiv.position.add(movement);
    
    // Apply damping with time correction
    const dampingFactor = Math.pow(0.95, timeMultiplier);
    indiv.velocity.multiplyScalar(dampingFactor);

    // Keep inside the cube room
    for (const axis of ['x', 'y', 'z']) {
      if (indiv.position[axis] > roomSize) {
        indiv.position[axis] = roomSize;
        indiv.velocity[axis] *= -0.8;
      } else if (indiv.position[axis] < -roomSize) {
        indiv.position[axis] = -roomSize;
        indiv.velocity[axis] *= -0.8;
      }
    }
  }
}
  
