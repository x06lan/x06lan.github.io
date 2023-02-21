
import {useEffect} from 'react';
import ThreeBlock from './Three_block';
import ImageBlockList from './Image_block';
import IconBlockList, {  BlockInfo } from './Icon_block';

// import logo from './assets/x06_icon.png';
// import backgroundImage from './assets/.png';
// import backgroundImage from './assets/banner.webp';
// import backgroundImage from './assets/banner.gif';
import './mainpage.css';



function Ball(props:{className:string,delay:number}){
  let style={animationDelay:props.delay.toString()+"s"};
  return (
    <div className="moveing_x" style={style}>
      <div className=" moveing_y" style={style}>
        <div className={"ball "+props.className} ></div>
      </div>
    </div>
  )
} 
function Main() 
{
  const tools:Array<BlockInfo>=[
    { src: "./img/tech/js.png", name: "js", href: "https://hackmd.io/@lanx06/js" },
    // { src: "./img/tech/jquery.png", name: "jquery", href: "" },
    // { src: "./img/tech/vuejs.png", name: "vue.js", href: "" },
    // { src: "./img/tech/api.png", name: "api", href: "https://hackmd.io/@lanx06/nodejs_api" },
    { src: "./img/tech/react.png", name: "react.js", href: "https://github.com/x06lan/react_page" },
    { src: "./img/tech/github.png", name: "github", href: "https://github.com/x06lan" },
    { src: "./img/tech/python.png", name: "python", href: "https://hackmd.io/@lanx06/python" },
    // { src: "./img/tech/opencv.png", name: "opencv", href: "" },
    // { src: "./img/tech/colab.png", name: "colab", href: "" },
    // { src: "./img/tech/pytorch.png", name: "pythoch", href: "" },
    // { src: "./img/tech/unity.png", name: "unity", href: "" },
    { src: "./img/tech/unreal.png", name: "unreal", href: "" },
    { src: "./img/tech/c++.png", name: "c++", href: "" },
    { src: "./img/tech/blender.png", name: "blender", href: "" },
  ];
let site:Array<BlockInfo>= [
    // { name: "json file tree", src: "./img/work/file_tree.png", href: "./json_to_filetree" },
    // { name: "markdown editer", src: "./img/work/editer.png", href: "./own_code" },
    // { name: "big data", src: "./img/work/ins.png", href: "./DrawYouInstagram" },
    // { name: "3D render ascii art", src: "./img/work/tri.png", href: "https://youtu.be/Jp458nW5IgE" },
    // { name: "unreal", src: './img/work/unreal_missile.png', href: "https://youtube.com/playlist?list=PLeoB7keAcLcOj02hPuEZypDvmf_G_1J0S" },
    // { name: "line bot github", src: "./img/work/line.png", href: "https://github.com/x06lan/line_bot_song_recognizer_Public" },
    { name: "p5.js noise", src: "./img/work/p5_noise_1.png", href: "https://x06lan.github.io/p5_js/noise_1" },
    { name: "p5.js particle", src: "./img/work/p5_particle_1.png", href: "https://x06lan.github.io/p5_js/particle_1" },
    { name: "three.js face boolean", src: "./img/work/face_boolean.png", href: "https://x06lan.github.io/three_js/face_boolean" },
    { name: "three.js 3D preview", src: "./img/work/3D_preview.png", href: "https://x06lan.github.io/three_js/load_obj" },
    { name: "matter.js 2D chain", src: "./img/work/chain.png", href: "https://x06lan.github.io/matter_js/chain" },
    // { name: "Alastor Scepter", src: "", href: "https://sketchfab.com/3d-models/hazbin-hotel-alastor-mic-648fdc5276c14878b3892370bda9f4da", sketchfab_id:"648fdc5276c14878b3892370bda9f4da",time:20210809},
    // { name: "Stolas grimoire", src: "", href: "https://sketchfab.com/3d-models/book-unapp-0a98459ea48546b480eaa3c80f8bc748", sketchfab_id:"0a98459ea48546b480eaa3c80f8bc748",time:20210816},
    { name: "diamond materials", src: "./img/work/diman.png", href: "https://www.artstation.com/artwork/3dJXRY",time:20210819},
    { name: "water simulation", src: "./img/work/water.png", href: "https://www.artstation.com/artwork/rAgENG",time:20210820},
    { name: "intel IC", src: "./img/work/ic.png", href: "https://www.artstation.com/artwork/48Y9Zn",time:20210821},
    { name: "flower", src: "./img/work/flower.png", href: "https://www.artstation.com/artwork/48YegW",time:20210823},
    { name: "human eye", src: "./img/work/eye.png", href: "https://www.artstation.com/artwork/B1AmPm",time:20210825},
    { name: "house", src: "./img/work/house.png", href: "https://www.artstation.com/artwork/3d5X62",time:20210827},
    { name: "helluva boss blitzo gun", src: "./img/work/gun.png", href: "https://www.artstation.com/artwork/NxXnZN",time:20210829},
    { name: "cloth", src: "./img/work/girl_with_cloth.png", href: "https://www.artstation.com/artwork/xYO1z4",time:20210829},
    { name: "night city", src: "./img/work/night_city.png", href: "https://www.artstation.com/artwork/G82DbW",time:20220319},
]
// let mouse={x:0,y:0}
  const darkTheme=window.matchMedia("(prefers-color-scheme: dark)");
  console.log(darkTheme.matches)
	useEffect(()=>{
	})
  
  return (
    <div className="bg-[#09110c]">
          <div className='absolute top-52 left-[20%] z-10'>
            <div className='mx-auto'>
              <h2 className='text-white text-6xl '>
                x06lan
              </h2>
              <br/>
              <h5 className='text-white text-4xl w-2/3'>
                Learning about 3D things
              </h5>

            </div>
          </div>
          <ThreeBlock />

        {/* <Ball className='w-32 bg-[#e893fb]' delay={-6}></Ball>
        <Ball className='w-48 bg-[#00fff2]' delay={-5}></Ball>
        <Ball className='w-52 bg-[#a2ff00]' delay={-4}></Ball>
        <Ball className='w-64 bg-[#00ff91]' delay={-3}></Ball>
        <Ball className='w-64 bg-[#0011ff]' delay={-2}></Ball>
        <Ball className='w-64 bg-[#ddff00]' delay={-1}></Ball> */}
        <div className="backdrop-blur w-full" >
        {/* <div className="bg-black"> */} 
        {/* <ThreeBlock></ThreeBlock> */}
        {/* <IconBlockList info={tools}></IconBlockList>
        {/* <SketchfabBlock {...site[5]}></SketchfabBlock> */}
        {/* {/* <IconBlockList info={tools}></IconBlockList> */}
        <IconBlockList info={tools}></IconBlockList> 
        <ImageBlockList info={site}></ImageBlockList> 
        </div>
    </div>
  );
}

export default Main;
