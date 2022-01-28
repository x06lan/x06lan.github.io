import React from "react";
class sketchfab_block extends React.Component {
    render(){
        let src="https://sketchfab.com/models/"+this.props.item_id+"/embed?autospin=0&autostart=1&camera=0&preload=1&ui_theme=dark"
        return(
        <div className ="sketchfab-embed-wrapper "> 
            <iframe title="hazbin hotel Alastor mic" 
            frameBorder="0" 
            allowFullScreen={true}
            mozallowfullscreen="true" 
            webkitallowfullscreen="true" 
            allow="fullscreen; autoplay; vr" xr-spatial-tracking ="true"
            execution-while-out-of-viewport="true" execution-while-not-rendered="true"
            width="200" height="200"  
            web-share="true"
            src={src}
            style={{borderRadius:"5% 5% 5% 5%"}}>
        </iframe>
        </div>)
    }
}

export default sketchfab_block;
