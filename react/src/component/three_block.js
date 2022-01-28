import * as THREE from 'three';
import { TrackballControls } from './jsm/controls/TrackballControls.js';
let camera, scene, renderer;
let geometry, material, mesh;
let block_height=400
let controls;


function animation( time ) {

	// mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	// mesh.position.x += 0.01
	renderer.render( scene, camera );

}
function init(targe) {
  	window.addEventListener('resize', onWindowResize);

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / block_height, 0.01, 10 );
	camera.position.z = 1;

	controls = new TrackballControls( camera, renderer.domElement );

	scene = new THREE.Scene();
	//background color
	scene.background = new THREE.Color( 0x3cffbe);

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, block_height);
	renderer.setAnimationLoop( animation );
	// let tem=
	document.body.appendChild( renderer.domElement );
	document.getElementById(targe).appendChild(renderer.domElement)
	// return (renderer.domElement)
	// return renderer.domElement

}
function onWindowResize() {

  renderer.setSize(window.innerWidth, block_height);

  camera.aspect = window.innerWidth / block_height;
  camera.updateProjectionMatrix();

}

init("three_canva")
// export default init