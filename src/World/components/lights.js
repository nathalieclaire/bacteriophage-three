import { DirectionalLight, HemisphereLight, PointLight, BufferGeometry, PointsMaterial, Points, BufferAttribute, MathUtils } from 'three';

function createLights() {
  const ambientLight = new HemisphereLight(
    'pink',
    'white',
    2,
  );

  const mainLight = new DirectionalLight('#00FFFF', 10);
  mainLight.position.set(1, 2, 1);

  // dna glow
  const pointLight = new PointLight(0xffffbb, 700, 0.35);
  pointLight.position.set(0, 0.23, 0); // Position the light to match the DNA's position

  // Create dust particles
  const dustCount = 40; // Number of dust particles
  const positions = new Float32Array(dustCount * 3); // Initialize the positions array

  for (let i = 0; i < dustCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 0.07; // Random X position within a range
      positions[i + 1] = (Math.random() - 0.5) * 0.11; // Random Y position within a range
      positions[i + 2] = (Math.random() - 0.5) * 0.07; // Random Z position within a range
  }

  const dustGeometry = new BufferGeometry();
  dustGeometry.setAttribute('position', new BufferAttribute(positions, 3));

  const dustMaterial = new PointsMaterial({
      size: 0.02, // Size of the dust particles
      sizeAttenuation: true,
      color: 0xaaaaaa, // Color of the dust particles
  });

  const dustParticles = new Points(dustGeometry, dustMaterial);
  dustParticles.position.set(0, 0.23, 0);

  // Create dust particles2
  const dustCount2 = 100; // Number of dust particles
  const positions2 = new Float32Array(dustCount2 * 3); // Initialize the positions array

  for (let i = 0; i < dustCount2 * 3; i += 3) {
      positions2[i] = (Math.random() - 0.5) * 0.05; // Random X position within a range
      positions2[i + 1] = (Math.random() - 0.5) * 0.09; // Random Y position within a range
      positions2[i + 2] = (Math.random() - 0.5) * 0.05; // Random Z position within a range
  }

  const dustGeometry2 = new BufferGeometry();
  dustGeometry2.setAttribute('position', new BufferAttribute(positions2, 3));

  const dustMaterial2 = new PointsMaterial({
      size: 0.035, // Size of the dust particles
      sizeAttenuation: true,
      color: 0x99ffff, // Color of the dust particles
      transparent: true,
      opacity: 0.2
  });

  const dustParticles2 = new Points(dustGeometry2, dustMaterial2);
  dustParticles2.position.set(0, 0.23, 0);

  const rotationSpeedY2 = MathUtils.degToRad(50);
  dustParticles.tick = (delta) => {
    // Rotate the DNA around the Y-axis
    dustParticles.rotation.y -= rotationSpeedY2 * delta;
  };

  return { ambientLight, mainLight, pointLight, dustParticles, dustParticles2 };
}

export { createLights };
