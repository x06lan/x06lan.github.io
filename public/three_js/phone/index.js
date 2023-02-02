import * as THREE from '../three.js/build/three.module.js';
import Stats from '../three.js/examples/jsm/libs/stats.module.js';
import { OrbitControls } from '../three.js/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../three.js/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from '../three.js/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from '../three.js/examples/jsm/loaders/OBJLoader.js';
import { TGALoader } from '../three.js/examples/jsm/loaders/TGALoader.js';

import { RGBELoader } from '../three.js/examples/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from '../three.js/examples/jsm/utils/RoughnessMipmapper.js';

import * as dat from '../dat.gui/build/dat.gui.module.js';

const scene = new THREE.Scene();
const clock = new THREE.Clock();
const textureLoader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
const renderer = new THREE.WebGLRenderer({
  antialias: true,    //是否開啟反鋸齒
  // precision: " highp", //highp/mediump/lowp 著色的精準度選擇，分別為高/中/低
  gammaOutput: true,
  premultipliedAlpha: false,  //是否設置Alpha著色透明度
  stencil: false, //是否開啟繪圖緩衝組成
  preserveDrawingBuffer: true, //是否保存繪圖緩衝 
});
let stats = new Stats()
let save_input = []

let contran = document.body
let tem_textures
let html_inputfile
let phone
// let is_input_models = false
let mixer = false

scene.background= new THREE.Color( 0x000000 );

const loader = new GLTFLoader();

loader.load(
  // resource URL
  "./models/phone/phone.gltf",
  function (gltf) {
    console.log(gltf)
      phone = gltf.scene
    if (phone.animations.length != 0) {
      mixer = new THREE.AnimationMixer(phone);
      let animations = mixer.clipAction(phone.animations[0])
      animations.play()
    }
    scene.add(phone);
    save_input.push(phone)
  }
  ,
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.log(error);

  }
);


function init() {

  contran.appendChild(stats.dom)
  contran.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.outputEncoding = THREE.sRGBEncoding;
  window.addEventListener('resize', onWindowResize);

  // camera.position.x = 0
  camera.position.y = 7
  camera.position.z = 7

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 1.5;
  controls.minDistance = 0.0001;
  controls.maxDistance = 5000;
  renderer.shadowMap.enabled = true;

  createLights()
  animate();

}



function onWindowResize() {

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

}
function createLights() {

  let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1)
  let ambientLight = new THREE.AmbientLight(0xe9b2ff, 1);
  let shadowLight = new THREE.DirectionalLight(0xffffff, 1);
  let shadow = new THREE.DirectionalLight(0xffffff, 1);

  shadowLight.position.set(0, 500, 350);
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

  // scene.add(gridHelper);
  // scene.add(new THREE.AxesHelper(100));
  // scene.add(hemisphereLight);  
  // scene.add(ch);
  scene.add(ambientLight);
  scene.add(shadowLight);
  scene.add(shadow);

}

const animate = function () {
  requestAnimationFrame(animate);
  //for animetion
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  stats.begin();
  phone.rotation.y+=Math.PI/200
  renderer.render(scene, camera);
  stats.end()
};

init()
