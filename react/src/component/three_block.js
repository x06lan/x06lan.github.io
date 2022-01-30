import * as THREE from 'three';
import {create,all, add, pi}from 'mathjs'
import { MeshStandardMaterial } from 'three';
import { seededRandom } from 'three/src/math/MathUtils';
const math = create(all)
// import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js"
let camera, scene, renderer;
let geometry, material, mesh;
let block_height=400
let mouse={x:0,y:0}
let step_ff=1
let cam_move={x:0,y:0,z:0}

// let time=0
function animation( time ) {

	// let count=time/1000
	let dt=0.05
	
	let add_v=math.pi/100
	camera.position.x=mouse.x
	camera.position.y=mouse.y
	// // console.log(step_ff)
	// // console.log(mesh.rotation)
	// if (step_ff==0){
	// 	// console.log("z")
	// 	mesh.position.z+=add_v
	// 	camera.position.z=mesh.position.z+3
	// 	if (mesh.position.z%(1)<dt){
	// 		step_ff=1
	// 	}
	// }
	// if (step_ff==1){
	// 	// console.log("y")
	// 	mesh.position.x+=add_v
	// 	camera.position.x=mesh.position.x+1
	// 	if (mesh.position.x%(1)<dt){
	// 		step_ff=0
	// 	}
	// }
	// if (step_ff==2){ 
	// 	console.log("x")
	// 	mesh.rotation.y+=add_v
	// 	if (mesh.rotation.y%(math.pi/2)<dt){
	// 		step_ff=0
	// 	}
	// }
	// time+=math.pi/300
	// console.log(math.sin(time/1000))
	// console.log(time)
	// mesh.rotation.y=math.pi/4
	// mesh.rotation.x+=temp/10
	// mesh.rotation.z+=temp/10
	
	// camera.position.x=+mouse.x
	// camera.position.y=mouse.y+1
	
	camera.lookAt( mesh.position );
	renderer.render( scene, camera );

}
function onDocumentMouseMove( event ) {

	const windowHalfX = window.innerWidth / 2;
	const windowHalfY = window.innerHeight / 2;
	mouse.x = ( event.clientX - windowHalfX ) /windowHalfX/2;
	mouse.y = ( event.clientY - windowHalfY ) / windowHalfY/2;
	// console.log(mouse)

}
function init(targe) {
  	window.addEventListener('resize', onWindowResize);
	document.addEventListener( 'mousemove', onDocumentMouseMove );
	document.addEventListener( 'mouseover', onDocumentMouseMove );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / block_height, 0.01, 10 );
	camera.position.z = 3;
	camera.position.x= 1;
	camera.position.y =1;

	// controls = new TrackballControls( camera, renderer.domElement );

	scene = new THREE.Scene();
	//background color
	scene.background = new THREE.Color( 0x3cffbe);

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	// mesh.position.y=-1
	scene.add( mesh );

	console.log(mesh)
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, block_height);
	renderer.setAnimationLoop( animation );
	// let tem=
	document.body.appendChild( renderer.domElement );
	document.getElementById(targe).appendChild(renderer.domElement)
	// return (renderer.domElement)
	const grid = new THREE.GridHelper( 100, 100, 0x000000, 0x000000 );
	
	grid.material.opacity = 0.2; 
	grid.material.transparent = true;
	scene.add( grid );
	const axisHelper = new THREE.AxisHelper( 5 );	
	scene.add( axisHelper );
	// const helper = new THREE.PolarGridHelper( 10, 16, 8, 64);
	// scene.add( helper );


}
function onWindowResize() {

  renderer.setSize(window.innerWidth, block_height);

  camera.aspect = window.innerWidth / block_height;
  camera.updateProjectionMatrix();

}

init("three_canva")
// export default init