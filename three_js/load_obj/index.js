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
const loader = new FBXLoader();

loader.load('models/fbx/source/seria0617.fbx', function (FBX) {
  // console.log(FBX)
  scene.add(FBX);
  save_input.push(FBX)

}, ()=> {}, function (error) {

  console.error(error);

});

let option = {

  position: {
    x: 0,
    y: 0,
    z: 0
  },
  scale: {
    x: 1,
    y: 1,
    z: 1
  },
  texture_type: 0

}
let texture_type = { "colorMap": 0, "normalMap": 1, "bumpMap": 6, "specularMap": 2, "emissiveMap": 3, "alphaMap": 4, "aoMap": 5, "metalnessMap": 7, "roughness/gloss": 8 }
option.select_folder = function () {
  html_inputfile.click()
}
option.clear = function () {
  console.log("clear")
  save_input.map((i) => {
    scene.remove(i);
  })
}


function getinf(indata, inside, callback) {

  try {
    if (indata[inside].length == 0) {
      callback(indata)
    }
    for (let i = 0; i < indata[inside].length; i++) {
      const element = indata[inside][i]
      getinf(element, inside, callback)
    }
  } catch (error) {
  }

}
option.setup_texture = function () {

  function load_texture() {
    let file = this.files[0]
    // console.log(this.files)
    var tmppath = URL.createObjectURL(file);

    textureLoader.load(tmppath, function (intexture) {
      texture.encoding = THREE.sRGBEncoding;
      console.log(input_models)
      console.log(intexture)
      if (option.texture_type == 0) {
        // console.log(scene)
        getinf(input_models, "children", (indata) => {
          indata.material.map = intexture
          indata.material.needsUpdate = true;
        })
      } else if (option.texture_type == 1) {
        getinf(input_models, "children", (indata) => {
          indata.material.normalMap = intexture
          indata.material.needsUpdate = true;
        })
      } else if (option.texture_type == 2) {
        getinf(input_models, "children", (indata) => {
          indata.material.specularMap = intexture
          indata.material.needsUpdate = true;
        })
      } else if (option.texture_type == 3) {
        getinf(input_models, "children", (indata) => {
          indata.material.emissiveMap = intexture
          indata.material.needsUpdate = true;
        })
      } else if (option.texture_type == 4) {
        getinf(input_models, "children", (indata) => {
          indata.material.alphaMap = intexture
          indata.material.needsUpdate = true;
        })
      } else if (option.texture_type == 5) {
        getinf(input_models, "children", (indata) => {
          indata.material.aoMap = intexture
          indata.material.needsUpdate = true;
        })
      } else if (option.texture_type == 6) {
        getinf(input_models, "children", (indata) => {
          indata.material.bumpMap = intexture
          indata.material.needsUpdate = true;
        })
      } else if (option.texture_type == 7) {
        getinf(input_models, "children", (indata) => {
          indata.material.metalnessMap = intexture
          indata.material.needsUpdate = true;
        })
      } else if (option.texture_type == 8) {
        getinf(input_models, "children", (indata) => {
          indata.material.roughnessMap = intexture
          indata.material.needsUpdate = true;
        })
      }
    })
  }
  let html_input_texture

  html_input_texture = document.createElement("input")
  html_input_texture.type = "file"
  html_input_texture.accept = "image/*"
  html_input_texture.onchange = load_texture
  html_input_texture.click()


}
let contran = document.body
let tem_textures
let html_inputfile
let input_models
let is_input_models = false
let mixer = false
const gui = new dat.GUI()
let controls = gui.addFolder("Controls")
controls.add(option, "select_folder")
controls.add(option, "clear")

let position = controls.addFolder("position")
position.add(option.position, "x", -10, 10, 0.01)
position.add(option.position, "y", -10, 10, 0.01)
position.add(option.position, "z", -10, 10, 0.01)

let scale = controls.addFolder("scale")
scale.add(option.scale, "x", 0, 2, 0.01)
scale.add(option.scale, "y", 0, 2, 0.01)
scale.add(option.scale, "z", 0, 2, 0.01)

let texture = controls.addFolder("texture")
texture.add(option, 'texture_type', texture_type)
texture.add(option, "setup_texture")

controls.open()

textureLoader.load('hdri.jpg', function (texture) {
  texture.encoding = THREE.sRGBEncoding;
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture
  tem_textures = texture
  init()

});
function init() {
  html_inputfile = document.createElement("input")
  html_inputfile.type = "file"
  // html_inputfile.multiple = true
  html_inputfile.webkitdirectory = true;
  html_inputfile.accept = ".fbx,.gltf,.obj,image/*"
  // html_inputfile.mozdirectory = true;
  html_inputfile.onchange = load_models


  // scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  // document.body.appendChild(html_inputfile)
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
  action()
}

  

function load_models() {
  let filemap = {}
  let mom_file = ""
  let preload_file
  let file_type = ""
  let mom_folder
  for (const file of this.files) {
    var tmppath = URL.createObjectURL(file);
    let tem_file_type = file.name.split(".")[file.name.split(".").length - 1]

    if (tem_file_type == "gltf") {
      preload_file = file
      mom_file = file.webkitRelativePath
      file_type = "gltf"
      mom_folder = file.webkitRelativePath.split("/")[0] + "/"

    } else if (tem_file_type == "fbx" || tem_file_type == "FBX") {
      preload_file = file
      mom_file = file.webkitRelativePath
      file_type = "fbx"
      mom_folder = file.webkitRelativePath.split("/")[0] + "/"
      console.log(mom_folder)

    } else if (tem_file_type == "obj") {
      preload_file = file
      mom_file = file.webkitRelativePath
      file_type = "obj"
      mom_folder = file.webkitRelativePath.split("/")[0] + "/"

    }
    let filename = file.name
    filemap[filename] = tmppath
    filemap[mom_folder + filename] = tmppath
    filemap[file.webkitRelativePath] = tmppath
    // filemap[file.webkitRelativePath] = tmppath
    // console.log(file)
  }
  console.log(mom_file)
  const manager = new THREE.LoadingManager();
  manager.setURLModifier((url) => {
    // console.log(url)
    let reurl = filemap[url];
    // console.log(typeof reurl)
    if (typeof reurl != "string") {
      for (var key in filemap) {
        if (key.split(url).length != 1) {
          return filemap[key]
        }
      }
    }
    return reurl;
  });
  let loader
  if (file_type == "gltf") {
    loader = new GLTFLoader(manager);

  } else if (file_type == "fbx") {
    loader = new FBXLoader(manager);

  } else if (file_type == "obj") {
    loader = new OBJLoader(manager);
  }

  // manager.addHandler(/\.tga$/i, new TGALoader());
  console.log(filemap)
  //if error

  var reader = new FileReader();

  reader.addEventListener("load", async function (event) {
    let gltf = loader.parse(event.target.result)
    // scene.add(obj)
    console.log(gltf)
    if (file_type == "gltf") {
      input_models = gltf.scene
    } else {
      input_models = gltf
    }
    if (input_models.animations.length != 0) {
      mixer = new THREE.AnimationMixer(input_models);
      let animations = mixer.clipAction(input_models.animations[0])
      animations.play()
    }
    scene.add(input_models);
    save_input.push(input_models)
    // save ram
    for (const key in filemap) {
      setTimeout(function () { URL.revokeObjectURL(filemap[key]) }, 5000)
    }
    // console.log(event.target.result)
    is_input_models = true
    console.log(gltf)

  })
  // reader.readAsArrayBuffer(preload_file);

  loader.load(
    // resource URL
    mom_file,
    function (gltf) {
      console.log(gltf)
      if (file_type == "gltf") {
        input_models = gltf.scene
      } else {
        input_models = gltf
      }
      if (input_models.animations.length != 0) {
        mixer = new THREE.AnimationMixer(input_models);
        let animations = mixer.clipAction(input_models.animations[0])
        animations.play()
      }
      // console.log(input_models)
      is_input_models = true
      // getinf(input_models, "children", (indata) => {
      //   if(indata.material.map==null)
      //   {
      //     indata.material=new THREE.MeshStandardMaterial({})
      //   }
      // })
      scene.add(input_models);
      save_input.push(input_models)
      for (const key in filemap) {
        setTimeout(function () { URL.revokeObjectURL(filemap[key]) }, 5000)
      }


    }
    ,
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.log(error);
      reader.readAsArrayBuffer(preload_file);

    }
  );
}



function action(shape) {

  animate();
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

  scene.add(gridHelper);
  scene.add(new THREE.AxesHelper(100));
  // scene.add(hemisphereLight);  
  // scene.add(ch);
  scene.add(ambientLight);
  scene.add(shadowLight);
  scene.add(shadow);

}

const animate = function () {
  if (is_input_models) {
    input_models.scale.x = option.scale.x
    input_models.scale.y = option.scale.y
    input_models.scale.z = option.scale.z
  } if (is_input_models) {
    input_models.position.x = option.position.x
    input_models.position.y = option.position.y
    input_models.position.z = option.position.z
  }

  requestAnimationFrame(animate);
  //for animetion
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  stats.begin();
  renderer.render(scene, camera);
  stats.end()

  // animate()
};