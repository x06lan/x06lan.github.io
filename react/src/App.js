import Image_block_list from "./component/Image_block.js"
import Icon_block_list from "./component/Icon_block.js"
import "./App.css";
var tool= [

    { src: "./img/js.png", name: "js", href: "https://hackmd.io/@lanx06/js" },
    { src: "./img/jquery.png", name: "jquery", href: "" },
    // { src: "./img/vuejs.png", name: "vue.js", href: "" },
    { src: "./img/api.png", name: "api", href: "https://hackmd.io/@lanx06/nodejs_api" },
    { src: "./img/github.png", name: "github", href: "https://github.com/x06lan" },
    { src: "./img/python.png", name: "python", href: "https://hackmd.io/@lanx06/python" },
    { src: "./img/opencv.png", name: "opencv", href: "" },
    // { src: "./img/colab.png", name: "colab", href: "" },
    { src: "./img/pytorch.png", name: "pythoch", href: "" },
    { src: "./img/unity.png", name: "unity", href: "" },
    { src: "./img/unreal.png", name: "unreal", href: "" },
    { src: "./img/blender.png", name: "blender", href: "" },

]
let site = [
    // { name: "json file tree", src: "./img/work/file_tree.png", href: "./json_to_filetree" },
    // { name: "markdown editer", src: "./img/work/editer.png", href: "./own_code" },
    // { name: "big data", src: "./img/work/ins.png", href: "./DrawYouInstagram" },
    // { name: "3D render ascii art", src: "./img/work/tri.png", href: "https://youtu.be/Jp458nW5IgE" },
    // { name: "unreal", src: './img/work/unreal_missile.png', href: "https://youtube.com/playlist?list=PLeoB7keAcLcOj02hPuEZypDvmf_G_1J0S" },
    // { name: "line bot github", src: "./img/work/line.png", href: "https://github.com/x06lan/line_bot_song_recognizer_Public" },
    { name: "p5.js noise", src: "./img/work/p5_noise_1.png", href: "./p5_js/noise_1" },
    { name: "p5.js particle", src: "./img/work/p5_particle_1.png", href: "./p5_js/particle_1" },
    { name: "three.js face boolean", src: "./img/work/face_boolean.png", href: "./three_js/face_boolean" },
    { name: "three.js 3D preview", src: "./img/work/3D_preview.png", href: "./three_js/load_obj" },
    { name: "matter.js 2D chain", src: "./img/work/chain.png", href: "./matter_js/chain" },
    { name: "hazbin hotel Alastor Scepter", src: "", href: "https://sketchfab.com/3d-models/hazbin-hotel-alastor-mic-648fdc5276c14878b3892370bda9f4da", sketchfab_id:"648fdc5276c14878b3892370bda9f4da",time:20210809},
    { name: "helluva boss Stolas grimoire", src: "", href: "https://sketchfab.com/3d-models/book-unapp-0a98459ea48546b480eaa3c80f8bc748", sketchfab_id:"0a98459ea48546b480eaa3c80f8bc748",time:20210816},
    { name: "blender diamond materials", src: "./img/work/diman.png", href: "https://www.artstation.com/artwork/3dJXRY",time:20210819},
    { name: "blender water simulation", src: "./img/work/water.png", href: "https://www.artstation.com/artwork/rAgENG",time:20210820},
    { name: "intel IC", src: "./img/work/ic.png", href: "https://www.artstation.com/artwork/48Y9Zn",time:20210821},
    { name: "flower", src: "./img/work/flower.png", href: "https://www.artstation.com/artwork/48YegW",time:20210823},
    { name: "human eye", src: "./img/work/eye.png", href: "https://www.artstation.com/artwork/B1AmPm",time:20210825},
    { name: "house", src: "./img/work/house.png", href: "https://www.artstation.com/artwork/3d5X62",time:20210827},
    { name: "helluva boss blitzo gun", src: "./img/work/gun.png", href: "https://www.artstation.com/artwork/NxXnZN",time:20210829},
]
let blog = [
    { name: "FFmpeg", src: "./img//blog/ffmpeg.png", href: "https://hackmd.io/@lanx06/ffmpeg" },
    { name: "tampermonkey", src: "./img/blog/tampermonkey.png", href: "https://hackmd.io/@lanx06/tampermonkey" },
    { name: "shields.io", src: "./img/blog/shields.io.png", href: "https://hackmd.io/@lanx06/shields" },
    { name: "git", src: "./img/blog/git.png", href: "https://hackmd.io/@lanx06/git" }

]
function App() {

  return (
    <div>
      <div className="header">
        <h1>x06lan</h1>
      </div>
      <div className="contenjt">
        <div className="tool">
          <h2 className="name_title"> Tech</h2>
          <Icon_block_list datas={tool}/>
        </div>
        <div className="work">
          <h2 className="name_title"> Work</h2>
          <Image_block_list datas={site}/>
        </div>
        <div className="blog">
          <h2 className="name_title"> Blog</h2>
          <Image_block_list datas={blog}/>
        </div>
      </div>
    </div>
    
  );
}

export default App;
