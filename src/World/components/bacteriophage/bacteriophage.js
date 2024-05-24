import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshStandardMaterial, Mesh, BoxGeometry, MathUtils, Vector3, MeshBasicMaterial, Group, Box3} from 'three';
import { setupModel } from './setupModel.js';

async function loadBacteriophage() {
  const loader = new GLTFLoader();

  const [headData, bodyData, dnaData, LegOneData, LegTwoData, LegThreeData, LegFourData, 
    LegFiveData, LegSixData] = await Promise.all([
    loader.loadAsync('/assets/models/head.glb'), //head
    loader.loadAsync('/assets/models/body.glb'), //body
    loader.loadAsync('/assets/models/dna_TT.glb'), //dna
    loader.loadAsync('/assets/models/legOne_Tglb.glb'), //leg1
    loader.loadAsync('/assets/models/legTwo_T.glb'), //leg2
    loader.loadAsync('/assets/models/legThree_T.glb'), //leg3
    loader.loadAsync('/assets/models/legFour_T.glb'), //leg4
    loader.loadAsync('/assets/models/legFive_T.glb'), //leg5
    loader.loadAsync('/assets/models/legSix_T.glb'), //leg6
  ]);

  console.log('yehaw', headData);
  
  const bodyMaterial = new MeshStandardMaterial({ 
    roughness: 0.1,
    metalness: 1,
    color: '#999999' 
  });

  const dnaMaterial = new MeshStandardMaterial({
    roughness: 0,
    metalness: 0,
    transparent: true,
    opacity: 0.7,
    color: '#55FF55'
  });

  const headMaterial = new MeshStandardMaterial({
    roughness: 0,
    metalness: 0.9,
    transparent: true,
    opacity: 0.5,
    color: '#FFDDFF'
  });

  const head = setupModel(headData);
  overwriteMaterials(head, headMaterial);
  head.position.set(0, 0, 0);

  const body = setupModel(bodyData);
  overwriteMaterials(body, bodyMaterial);
  body.position.set(0, 0, 0);

  const dna = setupModel(dnaData);
  overwriteMaterials(dna, dnaMaterial);
  dna.position.set(0, 0.23, 0);
  dna.scale.set(0.0009, 0.0009, 0.0009);

  const boxGeometry = new BoxGeometry(1, 1, 1);
  const boxMaterial = new MeshBasicMaterial({ visible: false }); // Make the box invisible
  const invisibleBox = new Mesh(boxGeometry, boxMaterial);

  invisibleBox.add(dna); // add dna as child of invisibleBox bc the DNA's pivot point was weird

  const rotationSpeedY = MathUtils.degToRad(10); // Adjust the rotation speed around the Y-axis

  // Animate the DNA spinning inside the head
  invisibleBox.tick = (delta) => {
    invisibleBox.rotation.y += rotationSpeedY * delta; // Rotate the DNA around the Y-axis
  };



  // LEGS

  const legOne = setupModel(LegOneData);
  overwriteMaterials(legOne, bodyMaterial);
  legOne.position.set(-0.052, 0.083, -0.088);
  
  const legOneBoundingBox = new Box3().setFromObject(legOne);

  // Create a hitbox around legTwo using the bounding box dimensions
  const hitbox1Size = legOneBoundingBox.getSize(new Vector3());
  const hitbox1 = new Mesh(
    new BoxGeometry(hitbox1Size.x, hitbox1Size.y, hitbox1Size.z),
    new MeshBasicMaterial({ color: 'blue', visible: false })
  );

  // Position the hitbox at the center of legTwo's bounding box
  const legOneCenter = legOneBoundingBox.getCenter(new Vector3());
  hitbox1.position.copy(legOneCenter);

  // Add legTwo and hitbox2 to a common parent object
  const legOneGroup = new Group();
  legOneGroup.add(legOne);
  legOneGroup.add(hitbox1);




  const legTwo = setupModel(LegTwoData);
  overwriteMaterials(legTwo, bodyMaterial);
  legTwo.position.set(-0.103, 0.083, 0.0023);

  const legTwoBoundingBox = new Box3().setFromObject(legTwo);

  // Create a hitbox around legTwo using the bounding box dimensions
  const hitbox2Size = legTwoBoundingBox.getSize(new Vector3());
  const hitbox2 = new Mesh(
    new BoxGeometry(hitbox2Size.x, hitbox2Size.y, hitbox2Size.z),
    new MeshBasicMaterial({ color: 'red', visible: false })
  );

  // Position the hitbox at the center of legTwo's bounding box
  const legTwoCenter = legTwoBoundingBox.getCenter(new Vector3());
  hitbox2.position.copy(legTwoCenter);

  // Add legTwo and hitbox2 to a common parent object
  const legTwoGroup = new Group();
  legTwoGroup.add(legTwo);
  legTwoGroup.add(hitbox2);




  const legThree = setupModel(LegThreeData);
  overwriteMaterials(legThree, bodyMaterial);
  legThree.position.set(-0.05, 0.083, 0.09);

  const legThreeBoundingBox = new Box3().setFromObject(legThree);

  // Create a hitbox around legTwo using the bounding box dimensions
  const hitbox3Size = legThreeBoundingBox.getSize(new Vector3());
  const hitbox3 = new Mesh(
    new BoxGeometry(hitbox3Size.x, hitbox3Size.y, hitbox3Size.z),
    new MeshBasicMaterial({ color: 'green', visible: false })
  );

  // Position the hitbox at the center of legTwo's bounding box
  const legThreeCenter = legThreeBoundingBox.getCenter(new Vector3());
  hitbox3.position.copy(legThreeCenter);

  // Add legTwo and hitbox2 to a common parent object
  const legThreeGroup = new Group();
  legThreeGroup.add(legThree);
  legThreeGroup.add(hitbox3);




  const legFour = setupModel(LegFourData);
  overwriteMaterials(legFour, bodyMaterial);
  legFour.position.set(0.053, 0.083, 0.088);

  const legFourBoundingBox = new Box3().setFromObject(legFour);

  // Create a hitbox around legTwo using the bounding box dimensions
  const hitbox4Size = legFourBoundingBox.getSize(new Vector3());
  const hitbox4 = new Mesh(
    new BoxGeometry(hitbox4Size.x, hitbox4Size.y, hitbox4Size.z),
    new MeshBasicMaterial({ color: 'yellow', visible: false })
  );

  // Position the hitbox at the center of legTwo's bounding box
  const legFourCenter = legFourBoundingBox.getCenter(new Vector3());
  hitbox4.position.copy(legFourCenter);

  // Add legTwo and hitbox2 to a common parent object
  const legFourGroup = new Group();
  legFourGroup.add(legFour);
  legFourGroup.add(hitbox4);




  const legFive = setupModel(LegFiveData);
  overwriteMaterials(legFive, bodyMaterial);
  legFive.position.set(0.103, 0.083, 0);

  const legFiveBoundingBox = new Box3().setFromObject(legFive);

  // Create a hitbox around legTwo using the bounding box dimensions
  const hitbox5Size = legFiveBoundingBox.getSize(new Vector3());
  const hitbox5 = new Mesh(
    new BoxGeometry(hitbox5Size.x, hitbox5Size.y, hitbox5Size.z),
    new MeshBasicMaterial({ color: 'cyan', visible: false })
  );

  // Position the hitbox at the center of legTwo's bounding box
  const legFiveCenter = legFiveBoundingBox.getCenter(new Vector3());
  hitbox5.position.copy(legFiveCenter);

  // Add legTwo and hitbox2 to a common parent object
  const legFiveGroup = new Group();
  legFiveGroup.add(legFive);
  legFiveGroup.add(hitbox5);




  const legSix = setupModel(LegSixData);
  overwriteMaterials(legSix, bodyMaterial);
  legSix.position.set(0.05, 0.083, -0.09);

  const legSixBoundingBox = new Box3().setFromObject(legSix);

  // Create a hitbox around legTwo using the bounding box dimensions
  const hitbox6Size = legSixBoundingBox.getSize(new Vector3());
  const hitbox6 = new Mesh(
    new BoxGeometry(hitbox6Size.x, hitbox6Size.y, hitbox6Size.z),
    new MeshBasicMaterial({ color: 'white', visible: false })
  );

  // Position the hitbox at the center of legTwo's bounding box
  const legSixCenter = legSixBoundingBox.getCenter(new Vector3());
  hitbox6.position.copy(legSixCenter);

  // Add legTwo and hitbox2 to a common parent object
  const legSixGroup = new Group();
  legSixGroup.add(legSix);
  legSixGroup.add(hitbox6);


  // override the lambert shaders that were already assigned to the 3 model during import
  function overwriteMaterials(object, material) {
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }

  return {
    invisibleBox,
    body,
    head,
    legOneGroup,
    legTwoGroup,
    legThreeGroup,
    legFourGroup,
    legFiveGroup,
    legSixGroup,
  };
}

export { loadBacteriophage };

