import * as THREE from 'three';
// import {Canvas, useFrame } from 'react-three-fiber';
import {Canvas, useFrame ,useThree} from '@react-three/fiber';

import {create,all, rotate}from 'mathjs'
// import { Perlin } from 'three-noise';
import { Perlin } from './three-noise.js';
import React, { useEffect, useRef,useState,useMemo}  from 'react';

type info={
	position?: number[],
	rotation?: number[],
	scale?: number[],
	ids?: number[],
}
type mouseInfo = {
	x: number,
    y: number,
}
let toVector3=(data:any)=>{
	if(data.length===3)return new THREE.Vector3(data[0],data[1],data[2])
	else return new THREE.Vector3(data[0],data[1],data[2]);
}
let toEuler=(data:any)=>{
	if(data.length===3)return new THREE.Euler(data[0],data[1],data[2])
	else return new THREE.Euler(data[0],data[1],data[2]);
}
function Box(props:info) {
	const mesh= useRef<THREE.Mesh>(null!)
	const [hovered, setHover] = useState(false)
	const [active, setActive] = useState(false)
	let math=create(all)
	return (
	  <mesh
		position={toVector3(props.position)}
		// rotation={toVector3(props.rotation)}
		ref={mesh}
		// scale={active ? 1.5 : 1}
		scale={toVector3(props.scale)}
        // rotation={rotation}
		// onClick={(event) => setActive(!active)}
		// onPointerOver={(event) => setHover(true)}
		// onPointerOut={(event) => setHover(false)}
		>
		<boxGeometry args={[1,1,1]} />
		{/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
		<meshNormalMaterial></meshNormalMaterial>
	  </mesh>
	)
  }

function Controlser(props:any){
	const camera = useThree((state) => state.camera)
	const gl = useThree((state) => state.gl)

	// const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
	let mouse={x:0,y:0}
	// let dir=
	const handleMouseMove = (ev:any)=>{
		const windowHalfX = window.innerWidth / 2;
		const windowHalfY = window.innerHeight / 2;
		let tem:mouseInfo={x:0,y:0};
		tem.x = ( ev.clientX - windowHalfX ) /windowHalfX/2;
		tem.y = ( ev.clientY - windowHalfY ) / windowHalfY/2;
		mouse=tem;
	}
	useEffect(()=>{
		window.addEventListener('mousemove',handleMouseMove);
		return () => {
			window.removeEventListener(
				'mousemove',
				handleMouseMove
			);
		};
	})
	
	// let camPosition =new THREE.Vector3(0,5,0);
	let targePosition =new THREE.Vector3(0,0,0);
	return useFrame((state,delta) => {
		state.camera.position.set(1,2*state.mouse.y,5);
		state.camera.lookAt(targePosition);
	})

}
function Cubes(props:any){
	const math = create(all)
	let noise = new Perlin(math.random());
	const tempObject = new THREE.Object3D()

	// let cubes=[];
	const size=10
	const gap=0.2;
	const noiseGap=0.7;
	const speed=0.2
	let groupRef=React.createRef<THREE.Group>()
	let instanceRef=React.createRef<THREE.InstancedMesh>()
	let mouse:mouseInfo = {x:0,y:0}
	// let [mouse,setMouse] = useState({x:0,y:0})
	// let dir=
	const handleMouseMove = (ev:any)=>{
		const windowHalfX = window.innerWidth / 2;
		const windowHalfY = window.innerHeight / 2;
		let tem:mouseInfo={x:0,y:0};
		tem.x = ( ev.clientX - windowHalfX ) /windowHalfX/2;
		tem.y = ( ev.clientY - windowHalfY ) / windowHalfY/2;
		mouse=tem;
	}
	useEffect(()=>{
		window.addEventListener('mousemove',handleMouseMove);
		return () => {
			window.removeEventListener(
				'mousemove',
				handleMouseMove
			);
		};
	},[])
	let euler=toEuler([math.pi/4,0,math.pi/4]);
	useFrame((state,delta,frame)=>{
		const time = state.clock.getElapsedTime()
		
		if(groupRef.current?.rotation){
			euler.y+=state.mouse.x/30;
			groupRef.current.setRotationFromEuler(euler)
		}
		if(instanceRef.current){
			let i=0
			for (let index_x= 1; index_x <= size; index_x++) {
				for(let index_y=1; index_y<=size;index_y++){
					for(let index_z=1; index_z<=size;index_z++){
						let id=i++;
						let noisePosition=new THREE.Vector3()
						noisePosition.x=index_x*gap*noiseGap+time*speed
						noisePosition.y=index_y*gap*noiseGap+time*speed
						noisePosition.z=index_z*gap*noiseGap+time*speed
						const newSize=(noise.get3(noisePosition)*0.6+0.3)
						tempObject.scale.set(newSize, newSize, newSize)
						tempObject.position.set(index_x*gap-size/2*gap,index_y*gap-size/2*gap,index_z*gap-size/2*gap)
						tempObject.updateMatrix()
						instanceRef.current.setMatrixAt(id,tempObject.matrix)
					}
				}
			}
			// console.log("ok")
			instanceRef.current.instanceMatrix.needsUpdate = true
		}
	})
	return (
		<group ref={groupRef} scale={1.1} >
			<instancedMesh ref={instanceRef} args={[,,1000]}>
				<boxGeometry args={[.6,.6,.6]}>

				</boxGeometry>
				<meshNormalMaterial/>

			</instancedMesh>
			{/* {cubes.map((info,key)=>{
				return <Box  key={key} {...info} />
			})} */}
		</group>
	)

}
function ThreeBlock(props:any) {
	let block_height=600

	return (
		<div className={"mx-auto max-w-[1000px] w-v2/3 aspect-square sticky top-2"} >
		<Canvas  frameloop="always" >
			<Cubes ></Cubes>
			{/* <ambientLight /> */}
			{/* <pointLight position={[10, 10, 10]} /> */}
			{/* <Box position={[0, 0, 0]} /> */}
			{/* <Box position={[1.2, 0, 0]} /> */}
			<Controlser ></Controlser>
		</Canvas>

		</div>
	)
}
export default ThreeBlock 