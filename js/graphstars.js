//get data from database and create map of stars

/*TODO: 
- moveable camera: DONE
- merge geometries: DONE
- effect when click on star (need to redo)
- show data about star when clicked
- group constellations together 
- search bar
- add more stars: DONE
*/

let url = 'https://abbymartin.github.io/fun-space-stuff/hygstars.json'

//scene vars
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let stars = [];
let starGeos = [];

//add stars from json data
function addStars(data) {
  //const geometry = new THREE.SphereBufferGeometry(0.05, 32, 32);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff});

  //add spheres at star positions
  for(let i = 0; i < data.length; i++) {
    stars.push(new THREE.Mesh(new THREE.SphereBufferGeometry(0.05, 6, 6), material));

    stars[i].position.set(data[i].x, data[i].y, data[i].z);
    stars[i].name = i;
    stars[i].updateMatrix();
    stars[i].geometry.applyMatrix4(stars[i].matrix);

    starGeos[i] = stars[i].geometry;
  }
  const mergeGeo = THREE.BufferGeometryUtils.mergeBufferGeometries(starGeos);
  const mesh = new THREE.Mesh(mergeGeo, material);
  scene.add(mesh);
  document.getElementById("load").remove();
}

//setup scene and make it work
function drawScene(data) {
  //show framerate
  let stats = addStats();
  document.body.appendChild(stats.domElement);

  //threejs setup
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  const controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.userPan = true;
  controls.userRotate = true;
  addStars(data);
  //set camera distance
  camera.position.z = 20;

  renderScene(controls, stats);
}

function interact(clicked, data) {
  const intersects = raycaster.intersectObjects(stars);
  if(intersects.length > 0) {
    document.body.style.cursor = "pointer";
    if(clicked) {
      console.log(data[intersects[0].object.name].proper);
    }
  }
  else {
    document.body.style.cursor = "default";
  }
}

//render and animate scene
function renderScene(controls, stats) {
  let animate = () => {
    //add animation loop
    requestAnimationFrame(animate)
    controls.update();
    stats.update();
    raycaster.setFromCamera( mouse, camera );
    renderer.render(scene, camera);
  }
  animate();
}

//get json data and use it
async function createMap() {
  //get json from url
  let response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error :( ${response.status}`);
  }
  let data = await response.json(); 
  console.log(data);

  drawScene(data);

  //FIX LATER 
  // //interactvity
  document.addEventListener("mousemove", (event) => {
    //update mouse positon
    mouse.x = (event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight ) * 2 + 1;
    interact(false, data);
  });

  document.addEventListener("pointerdown", (event) => {
    interact(true, data);
  });
}

createMap();

//framerate
function addStats() {
  var stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0';
  stats.domElement.style.top = '0';

  return stats;
}


