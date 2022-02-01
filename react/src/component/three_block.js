import * as THREE from 'three';
import {create,all, add, pi, index}from 'mathjs'
import { MeshStandardMaterial } from 'three';
import { Perlin } from 'three-noise';
import { seededRandom } from 'three/src/math/MathUtils';
const math = create(all)
let noise = new Perlin(math.random());
let camera, scene, renderer;
let geometry ,material ,meshs;
let block_height=400
let mouse={x:0,y:0}
let cam_move={x:0,y:0,z:0}
let cubes=[]
let size=10
let gap=0.2

function animation( time ) {

	let dt=0.0005
	// pos.x=time*dt
	// console.log(noise.get3(pos))
	camera.position.x=mouse.x
	camera.position.y=mouse.y+3
	
	let gap_noise=0.7
	// console.log(size)
	meshs.rotation.y=dt*time
	for (let index_x= 0; index_x <size; index_x++) {
		for(let index_y=0; index_y<size;index_y++){
			for(let index_z=0; index_z<size;index_z++){
				let cube=cubes[index_x][index_y][index_z]
				const pos = new THREE.Vector3()
				pos.x=index_x*gap*gap_noise+time*dt
				pos.y=index_y*gap*gap_noise+time*dt
				pos.z=index_z*gap*gap_noise+time*dt
				let new_size=noise.get3(pos)*1.3+1
				cube.scale.x=new_size
				cube.scale.y=new_size
				cube.scale.z=new_size
				

			}
		}
	}
	if(time<10)	{

	// console.log(cubes)
	}
	camera.lookAt( meshs.position );
	renderer.render( scene, camera );

}
function onDocumentMouseMove( event ) {

	const windowHalfX = window.innerWidth / 2;
	const windowHalfY = window.innerHeight / 2;
	mouse.x = ( event.clientX - windowHalfX ) /windowHalfX/2;
	mouse.y = ( event.clientY - windowHalfY ) / windowHalfY/2;

}
function init(targe) {
  	window.addEventListener('resize', onWindowResize);
	document.addEventListener( 'mousemove', onDocumentMouseMove );
	document.addEventListener( 'mouseover', onDocumentMouseMove );

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / block_height, 0.01, 10 );
	camera.position.z = 3;
	camera.position.x= 1;

	scene = new THREE.Scene();
	//background color
	scene.background = new THREE.Color( 0x3cffbe);

	// geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();
	geometry = new THREE.BufferGeometry();

	let group= new THREE.Mesh( geometry, material );
	meshs = new THREE.Mesh( geometry, material );
	for (let index_x= 1; index_x <= size; index_x++) {
		let tem2=[]
		for(let index_y=1; index_y<=size;index_y++){

			let tem=[]
			for(let index_z=1; index_z<=size;index_z++){
				let tem_geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2);
				let tem_material = new THREE.MeshNormalMaterial();
				let tem_mesh = new THREE.Mesh( tem_geometry, tem_material );
				tem_mesh.position.x=index_x*gap-size/2*gap
				tem_mesh.position.y=index_y*gap-size/2*gap
				tem_mesh.position.z=index_z*gap-size/2*gap
				group.add(tem_mesh)
				tem.push(tem_mesh)
			}
			tem2.push(tem)
		}
		cubes.push(tem2)
	}

	group.rotation.x=math.pi/4
	group.rotation.z=math.pi/4
	

	meshs.add(group)

	scene.add( meshs );
	console.log(cubes)
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, block_height);
	renderer.setAnimationLoop( animation );
	document.body.appendChild( renderer.domElement );
	document.getElementById(targe).appendChild(renderer.domElement)
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