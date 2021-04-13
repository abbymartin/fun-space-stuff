//get data from database and create map of stars

/*TODO: 
- moveable camera
- effect when click on star
- group constellations
- search bar
- add more stars (dynamic loading?)
*/

let url = 'https://abbymartin.github.io/fun-space-stuff/visiblestars.json'

function addStars(data, scene) {
  let stars = [];

  const geometry = new THREE.SphereGeometry();
  const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF})

  //add spheres at star positions
  for(let i = 0; i < data.length; i++) {
    stars.push(new THREE.Mesh(geometry, material));

    //set position and size
    stars[i].position.x = data[i].x;
    stars[i].position.y = data[i].y;
    stars[i].position.z = data[i].z;
    stars[i].scale.x = 0.1;
    stars[i].scale.y = 0.1;
    stars[i].scale.z = 0.1;

    scene.add(stars[i]);
  }
}

function drawScene(data) {
  //three.js setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new THREE.TrackballControls(camera, renderer.domElement);
  //set up mouse control 
  controls.target.set(0, 0, 0);
  controls.userPan = true;
  controls.userRotate = true;


  addStars(data, scene);

  //set camera distance
  camera.position.z = 20;

  renderScene(scene, camera, renderer, controls);
}

function renderScene(scene, camera, renderer, controls) {

  let animate = () => {
    //add animation loop
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
    controls.update();
  }
    
    animate();
}

async function createMap() {
  //get json from url
  let response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error :( ${response.status}`);
  }
  let data = await response.json(); 
  console.log(data);

  drawScene(data);
}

createMap();



