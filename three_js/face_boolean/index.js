import * as THREE from '../three.js/build/three.module.js';
import Stats from '../three.js/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';

import * as dat from '../dat.gui/build/dat.gui.module.js';
// import * as dat from '.../dat.gui/build/dat.gui.module.js';

import { CSG } from '../csg.js/csg.js'
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
let cube_position = [
  new THREE.Vector3(0,0,0), 
    new THREE.Vector3(0,0,0)
]
let stats = new Stats()

let option = {
  speed: 70,
  size: 30,
  opacity: 1,
  Boolean_type: 2,
  shape: "",
  wireframe: false,
  move: true,
  colors: {
    color1: 0x00ff00,
    color2: 0xff0000,
    color3: 0xffff00
  },
  drift: {
    x: 10,
    y: 20,
    z: 10
  }

}

function reset() {
  cube_position[0] = cube1.position
  cube_position[1] = cube2.position
  scene.remove(cube1)
  scene.remove(cube2)
  scene.remove(cube3)

}
option.cube = function () {
  option.shape = option.cube
  reset()

  gyaction(new THREE.BoxGeometry(option.size, option.size, option.size))
}

option.cylinder = function () {
  option.shape = option.cylinder
  reset()
  gyaction(new THREE.CylinderGeometry(option.size, option.size, option.size * 2, 32))

}
option.ball = function () {
  option.shape = option.ball
  reset()
  gyaction(new THREE.SphereGeometry(option.size, 16, 16))

}
option.Torus = function () {
  option.shape = option.Torus
  reset()
  gyaction(new THREE.TorusGeometry(option.size, option.size / 2, 20, 20))
}
option.TorusKnot = function () {
  option.shape = option.TorusKnot
  reset()
  gyaction(new THREE.TorusKnotGeometry(option.size, option.size / 5, 30, 5))
}
option.shape = option.cube
const gui = new dat.GUI()
let controls = gui.addFolder("Controls")
let colors = controls.addFolder("color")
controls.add(option, 'Boolean_type', { "AND": 0, "OR": 1, "A-B": 2, "B-A": 3 }).onChange(() => option.shape())

colors.addColor(option.colors, "color1")
colors.addColor(option.colors, "color2")
colors.addColor(option.colors, "color3")

controls.add(option, "speed", -100, 99, 0.01)
controls.add(option, "opacity", 0, 1, 0.01)
controls.add(option, "size", 1, 100, 0.1).onChange(()=>option.shape())
controls.add(option, "wireframe")
controls.add(option, "move")

controls.open()

let shape = controls.addFolder("shape")

shape.add(option, "cube")
shape.add(option, "cylinder")
shape.add(option, "ball")
shape.add(option, "Torus")
shape.add(option, "TorusKnot")

let drift = controls.addFolder("drift")
drift.add(option.drift, "x", -50, 50, 0.1).onChange(() => option.shape())
drift.add(option.drift, "y", -50, 50, 0.1).onChange(() => option.shape())
drift.add(option.drift, "z", -50, 50, 0.1).onChange(() => option.shape())

let contran = document.body
let cube1, cube2, cube3, cube4
let textures


textureLoader.load('hdri.jpg', function (texture) {
  texture.encoding = THREE.sRGBEncoding;
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture
  textures = texture
  init()

});
function init() {
  // scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  contran.appendChild(stats.dom)
  contran.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.outputEncoding = THREE.sRGBEncoding;
  window.addEventListener('resize', onWindowResize);

  camera.position.x = 0
  camera.position.y = 100
  camera.position.z = 100

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 1.5;
  controls.minDistance = 1;
  controls.maxDistance = 5000;
  // renderer.shadowMap.enabled = true;
  createLights()
  gyaction(new THREE.BoxGeometry(30, 30, 30))
  animate();


}

let material = function (color) {
  return new THREE.MeshPhongMaterial({
    color: color,
    shininess: 0,
    specular: 0xffffff,
    flatShading: true,
    transparent: true,
    // alphaTest:0,
    // side:THREE.BackSide
    // shading: THREE.FlatShading
    // shading : THREE.SmoothShading
    // wireframe: true
  });
}


function gy(face, set_material) {

  const geometry = new THREE.BufferGeometry()
  // geometry.dynamic = true;
  // geometry.verticesNeedUpdate = true;
  geometry.setAttribute('position', new THREE.BufferAttribute(face, 3));
  // geometry.index=new THREE.Uint16BufferAttribute()
  // geometry.setIndex(new THREE.BufferAttribute(face,3))
  // geometry.computeVertexNormals(true)
  let index_arr = []
  for (let i = 0; i < face.length / 3; i++) {
    index_arr.push(i)
  }

  // const geometry = new THREE.PolyhedronGeometry( face, index_arr, 30, 0 );
  // geometry.index.array=index_arr
  // geometry.index.itemSize=1
  // geometry.index.count=index_arr.length

  let groups = []
  for (let i = 0; i < index_arr.length / 3; i++) {
    let out = {
      start: i * 3,
      count: 3,
      materialIndex: i
    }
    groups.push(out)
  }
  // geometry.groups=groups
  const newgy = new THREE.Mesh(geometry, set_material);
  // newgy.castShadow = true;
  // newgy.receiveShadow = true;
  return newgy;
}
function gyaction(shape) {

  let cube = shape

  let cube_face1 = []
  let cube_face2 = []
  cube.index.array.map(function (i) {
    let x = cube.attributes.position.array[i * 3]
    let y = cube.attributes.position.array[i * 3 + 1]
    let z = cube.attributes.position.array[i * 3 + 2]

    cube_face1.push(x, y, z)
    cube_face2.push(x + option.drift.x, y + option.drift.y, z + option.drift.z)

  })
  // CSG.face_toCSG()
  let cut1 = CSG.face_toCSG(cube_face1)
  let cut2 = CSG.face_toCSG(cube_face2);
  let cut3
  if (option.Boolean_type == 0) cut3 = cut1.intersect(cut2);
  else if (option.Boolean_type == 1) cut3 = cut1.union(cut2);
  else if (option.Boolean_type == 2) cut3 = cut1.subtract(cut2);
  else cut3 = cut2.subtract(cut1);

  // console.log(CSG.CSG_toface(cut3))

  const cube_face3 = new Float32Array(CSG.CSG_toface(cut3));

  cube1 = gy(new Float32Array(cube_face1), material(0x00ff00))
  cube2 = gy(new Float32Array(cube_face2), material(0xff0000))
  // cube3 = gy(new Float32Array(cube_face3.map((i) => {
  //   if (i > 0) return i - 1;
  //   else if (i < 0) return i + 1;
  //   else { return 0 };
  // })),
  //   material(0xffff00))

  cube3 = gy(new Float32Array(cube_face3.map((i) => { return i * 0.97 })), material(0xffff00))

  cube1.position.x=cube_position[0].x
  cube1.position.y=cube_position[0].y
  cube1.position.z=cube_position[0].z
  cube2.position.x=cube_position[1].x
  cube2.position.y=cube_position[1].y
  cube2.position.z=cube_position[1].z
  // cube2.position=cube_position[1]
  scene.add(cube1)
  scene.add(cube2)
  scene.add(cube3)

  // console.log(new THREE.Vector3(0,0,0))
}

function onWindowResize() {

  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

}
// 我的幾何體
function createLights() {

  let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1)

  let ambientLight = new THREE.AmbientLight(0xe9b2ff, 0.3);
  let shadowLight = new THREE.DirectionalLight(0xffffff, 0.5);
  let shadow = new THREE.DirectionalLight(0xffffff, 0.1);
  shadowLight.position.set(150, 100, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.near = 0.1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 1024;
  shadowLight.shadow.mapSize.height = 1024;

  shadow.position.set(-150, -350, -350);
  shadow.castShadow = true;
  shadow.shadow.camera.near = 0.1;
  shadow.shadow.camera.far = 1000;
  shadow.shadow.mapSize.width = 1024;
  shadow.shadow.mapSize.height = 1024;

  const d = 300;

  shadowLight.shadow.camera.left = - d;
  shadowLight.shadow.camera.right = d;
  shadowLight.shadow.camera.top = d;
  shadowLight.shadow.camera.bottom = - d;

  var ch = new THREE.CameraHelper(shadowLight.shadow.camera);
  const gridHelper = new THREE.GridHelper(1000, 20);
  let lightProbe = new THREE.LightProbe();
  scene.add(lightProbe)
  // scene.add( new LightProbeHelper( lightProbe, 5 ) );
  // scene.add(gridHelper);
  // scene.add(new THREE.AxesHelper(100));
  // scene.add(hemisphereLight);  
  // scene.add(ch);
  scene.add(ambientLight);
  scene.add(shadowLight);
  scene.add(shadow);

}

let add = 0.3
let conuter = 0
let endpoint_arr = [-100, 0]

let endpoint = endpoint_arr[0]

const animate = function () {
  endpoint_arr[0] = -option.size * 4
  cube1.material = material(option.colors.color1)
  cube2.material = material(option.colors.color2)
  cube3.material = material(option.colors.color3)

  cube1.material.opacity = option.opacity
  cube2.material.opacity = option.opacity
  cube1.material.wireframe = option.wireframe
  cube2.material.wireframe = option.wireframe
  cube3.material.wireframe = option.wireframe

  requestAnimationFrame(animate);

  add = Math.abs(endpoint - cube1.position.x) / (100 - option.speed)
  if (add < 0.000005 && option.speed > 0) add = 0.000005
  if (option.move) {
    if (endpoint - cube1.position.x > 0) {
      cube1.position.x += add
      cube2.position.x -= add
    } else {
      cube1.position.x -= add
      cube2.position.x += add
    }
  }

  if (Math.abs(endpoint - cube1.position.x) < 0.1) {
    endpoint = endpoint_arr[conuter % 2]
    conuter++;
  }

  stats.begin();
  renderer.render(scene, camera);
  stats.end()
};