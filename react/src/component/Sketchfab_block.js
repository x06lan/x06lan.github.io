function sketchfab_block(props) {
    let src="https://sketchfab.com/models/"+props.item_id+"/embed?autospin=0&autostart=1&camera=0&preload=1&ui_theme=dark"
    return(
    <div className ="sketchfab-embed-wrapper "> 
        <iframe title="hazbin hotel Alastor mic" 
        frameborder="0" allowfullscreen mozallowfullscreen="true" 
        webkitallowfullscreen="true" allow="fullscreen; autoplay; vr" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share width="200" height="200"  
        src={src}
        style={{borderRadius:"5% 5% 5% 5%"}}>
    </iframe>
    </div>)
}

export default sketchfab_block;
