var skill = [

    { src: "./img/js.png", name: "js", href: "https://hackmd.io/@lanx06/js" },
    { src: "./img/jquery.png", name: "jquery", href: "" },
    { src: "./img/vuejs.png", name: "vue.js", href: "" },
    // { src: "./img/api.png", name: "api", href: "https://hackmd.io/@lanx06/nodejs_api" },

    { src: "./img/github.png", name: "github", href: "https://github.com/x06lan" },
    { src: "./img/python.png", name: "python", href: "https://hackmd.io/@lanx06/python" },
    { src: "./img/opencv.png", name: "opencv", href: "" },
    // { src: "./img/colab.png", name: "colab", href: "" },
    { src: "./img/pytorch.png", name: "pythoch", href: "" },

    { src: "./img/unity.png", name: "unity", href: "" },
    { src: "./img/unreal.png", name: "unreal", href: "" },
    { src: "./img/blender.png", name: "blender", href: "" },

]
let add_iframe1='<div class="sketchfab-embed-wrapper"> <iframe title="hazbin hotel Alastor mic" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="fullscreen; autoplay; vr" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share width="200" height="200"  src="https://sketchfab.com/models/'

let add_iframe2= '/embed?autospin=0&autostart=1&camera=0&preload=1&ui_theme=dark">    </iframe></div>'

let site = [
    // { name: "json file tree", img: "./img/work/file_tree.png", href: "./json_to_filetree" },
    // { name: "markdown editer", img: "./img/work/editer.png", href: "./own_code" },
    // { name: "big data", img: "./img/work/ins.png", href: "./DrawYouInstagram" },
    // { name: "3D render ascii art", img: "./img/work/tri.png", href: "https://youtu.be/Jp458nW5IgE" },
    // { name: "unreal", img: './img/work/unreal_missile.png', href: "https://youtube.com/playlist?list=PLeoB7keAcLcOj02hPuEZypDvmf_G_1J0S" },
    // { name: "line bot github", img: "./img/work/line.png", href: "https://github.com/x06lan/line_bot_song_recognizer_Public" },
    { name: "p5.js noise", img: "./img/work/p5_noise_1.png", href: "./p5_js/noise_1" },
    { name: "p5.js particle", img: "./img/work/p5_particle_1.png", href: "./p5_js/particle_1" },
    { name: "three.js face boolean", img: "./img/work/face_boolean.png", href: "./three_js/face_boolean" },
    { name: "three.js 3D preview", img: "./img/work/3D_preview.png", href: "./three_js/load_obj" },
    { name: "matter.js 2D chain", img: "./img/work/chain.png", href: "./matter_js/chain" },
    { name: "hazbin hotel Alastor Scepter", img: "", href: "https://sketchfab.com/3d-models/hazbin-hotel-alastor-mic-648fdc5276c14878b3892370bda9f4da", add:add_iframe1+"648fdc5276c14878b3892370bda9f4da"+add_iframe2,time:20210809},
    { name: "helluva boss Stolas grimoire", img: "", href: "https://sketchfab.com/3d-models/book-unapp-0a98459ea48546b480eaa3c80f8bc748", add:add_iframe1+"0a98459ea48546b480eaa3c80f8bc748"+add_iframe2,time:20210816},
    { name: "blender diamond materials", img: "./img/work/diman.png", href: "https://www.artstation.com/artwork/3dJXRY",time:20210819},
    { name: "blender water simulation", img: "./img/work/water.png", href: "https://www.artstation.com/artwork/rAgENG",time:20210820},
    { name: "intel IC", img: "./img/work/ic.png", href: "https://www.artstation.com/artwork/48Y9Zn",time:20210821},



]
let blog = [
    { name: "FFmpeg", img: "./img//blog/ffmpeg.png", herf: "https://hackmd.io/@lanx06/ffmpeg" },
    { name: "tampermonkey", img: "./img/blog/tampermonkey.png", herf: "https://hackmd.io/@lanx06/tampermonkey" },
    { name: "shields.io", img: "./img/blog/shields.io.png", herf: "https://hackmd.io/@lanx06/shields" },
    { name: "git", img: "./img/blog/git.png", herf: "https://hackmd.io/@lanx06/git" }

]


function add_img() {
    var skill_div = $("." + "container")[0]
    for (var i = 0; i < skill.length; i++) {

        let div = document.createElement("div")
        // console.log(skill[i]);
        div.className = "img_div"
        let image = document.createElement("img")
        // image.className="img120"
        image.src = skill[i].src
        let title = document.createElement("h3")
        title.innerHTML = skill[i].name;
        div.appendChild(image)
        div.appendChild(title)
        if (skill[i].href != "") {
            let a = document.createElement("a")
            a.href = skill[i].href
            a.appendChild(div)
            skill_div.appendChild(a)
            console.log(skill[i].href)
        }
        else{
            skill_div.appendChild(div)
        }

    }
    // body...
}

function add_site() {
    let work = $("." + "container")[1]
    for (var i = 0; i < site.length; i++) {
        let a = document.createElement("a")
        let div = document.createElement("div")
        let herf = site[i]["href"]
        // console.log(herf);
        a.href = herf

        div.className = "work_div"
        let image = document.createElement("img")
        image.src = site[i].img
        let title = document.createElement("h3")
        title.innerHTML = site[i].name;
        if(site[i]["add"]!=null){
            div.innerHTML=site[i]["add"]
            div.appendChild(title)
            a.appendChild(div)
            work.appendChild(a)
            
        }else{
            div.appendChild(image)
            div.appendChild(title)
            a.appendChild(div)
            work.appendChild(a)
        }  

    }
}

function add_blog() {
    let blog_div = $("." + "container")[2]
    for (var i = 0; i < blog.length; i++) {
        let a = document.createElement("a")
        let div = document.createElement("div")
        div.className = "work_div";
        a.href = blog[i].herf;
        let image = document.createElement("img")
        image.src = blog[i].img
        let title = document.createElement("h3")
        title.innerHTML = blog[i].name;
        div.appendChild(image)
        div.appendChild(title)
        a.appendChild(div)
        blog_div.appendChild(a)
    }
}