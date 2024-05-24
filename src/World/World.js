import { loadBacteriophage } from './components/bacteriophage/bacteriophage.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight, pointLight, dustParticles, dustParticles2 } = createLights();

    loop.updatables.push(controls, dustParticles);

    scene.add(ambientLight, mainLight, pointLight, dustParticles, dustParticles2);

    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    const { invisibleBox, body, head, legOneGroup,  legTwoGroup, legThreeGroup, legFourGroup, legFiveGroup, legSixGroup } = await loadBacteriophage();
    // move bacteriophage down a bit
    controls.target.set(0,0.07,0);

    loop.updatables.push(invisibleBox);

    scene.add(invisibleBox, body, head, legOneGroup,  legTwoGroup, legThreeGroup, legFourGroup, legFiveGroup, legSixGroup);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
