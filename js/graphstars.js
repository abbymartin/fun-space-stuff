//fetch request
let url = 'https://abbymartin.github.io/fun-space-stuff/visiblestars.json'

async function createMap() {
  //get json from url
  let response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error :( ${response.status}`);
  }
  let data = await response.json(); 
  console.log(data);

  //three.js setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  let stars = [];

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry();
  const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF})

  //add spheres at star positions
  for(let i = 0; i < data.length; i++) {
    //add sphere to array
    stars.push(new THREE.Mesh(geometry, material));

    //set position and size
    stars[i].position.x = data[i].x;
    stars[i].position.y = data[i].y;
    stars[i].position.z = data[i].z;
    stars[i].scale.x = 0.1;
    stars[i].scale.y = 0.1;
    stars[i].scale.z = 0.1;

    //add sphere to scene
    scene.add(stars[i]);
  }

  //set camera distance
  camera.position.z = 100;

  //render graphics
  renderer.render(scene, camera);
}


createMap();



