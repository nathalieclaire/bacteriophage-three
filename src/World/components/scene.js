import { Scene, EquirectangularReflectionMapping } from 'three';
import { RGBELoader } from '/vendor/three/examples/jsm/loaders/RGBELoader';

function createScene() {
  const scene = new Scene();
  const loader = new RGBELoader();
  const hdrTextureURL = new URL('/assets/images/nebula_27_low.hdr', import.meta.url);
  
  loader.load(hdrTextureURL, function(texture){
    texture.mapping = EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  })

  return scene;
}

export { createScene };
