import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.useLegacyLights = true;

  // this line is necessary for the render order of transparent objects, otherwise 
  // some objects would dissapear when you move around your mouse
  renderer.sortObjects = false;

  return renderer;
}

export { createRenderer };
