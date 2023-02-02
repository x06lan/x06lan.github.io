import React, { useEffect, useState} from "react";
import "../mainpage/block.css"
function SketchfabBlock(props:{name:string,sketchfab_id: string}) {
    let [src,setSrc]=useState("");
    useEffect(() => {
        setSrc("https://sketchfab.com/models/"+props.sketchfab_id+"/embed?autospin=0&autostart=1&camera=0&preload=1&ui_theme=dark")
    }, [props.sketchfab_id]);
    // window.onchange = () => {
    
    return ( 
        <div className="main-block">
        <iframe title={props.name} 
            allowFullScreen={true}
            allow="fullscreen; autoplay; vr" xr-spatial-tracking ="true"
            execution-while-out-of-viewport="true" execution-while-not-rendered="true"
            // width="50%" height="100%"  
            width="200xp" height="200px"  
            web-share="true"
            src={src}
            // style={{borderRadius:"5% 5% 5% 5%"}}
            className="block-image rounded-lg aspect-square"
            >
        </iframe>
        </div>
    )
}

export default SketchfabBlock;
