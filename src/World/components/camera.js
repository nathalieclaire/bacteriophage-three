import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(10, 100, 0.2, 300);
  camera.position.set(-1.5, 1.5, 3.7);
  return camera;
}

export { createCamera };
