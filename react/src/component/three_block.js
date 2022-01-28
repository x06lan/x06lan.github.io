import * as THREE from 'three';
// import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js"
let camera, scene, renderer;
let geometry, material, mesh;
let block_height=400
let mouse={x:0,y:0}


function animation( time ) {

	// mesh.rotation.x = time / 2000;
	// mesh.rotation.y = time / 1000;
	camera.position.x=mouse.x/200
	camera.position.y=mouse.y/200
	
	camera.lookAt( mesh.position );
	// controls.update();
	// mesh.position.x += 0.01
	renderer.render( scene, camera );

}
function onDocumentMouseMove( event ) {

	const windowHalfX = window.innerWidth / 2;
	const windowHalfY = window.innerHeight / 2;
	mouse.x = ( event.clientX - windowHalfX ) / 2;
	mouse.y = ( event.clientY - windowHalfY ) / 2;
	// console.log(mouse)

}
function init(targe) {
  	window.addEventListener('resize', onWindowResize);
	document.addEventListener( 'mousemove', onDocumentMouseMove );
	document.addEventListener( 'mouseover', onDocumentMouseMove );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / block_height, 0.01, 10 );
	camera.position.z = 1;
	camera.position.x= 0.01
	camera.position.y =0.01;

	// controls = new TrackballControls( camera, renderer.domElement );

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