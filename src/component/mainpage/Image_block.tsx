import SketchfabBlock from "./Sketchfab_block"
import {BlockInfo} from "./Icon_block"
import "./block image.css"
import React ,{ useEffect, useRef} from "react"
type propsType ={
    info: BlockInfo[];
}
const ImageBlock=React.forwardRef((props:BlockInfo,ref:any)=>{
    function ImgText({src,text,sketchfab_id}:{src:string,text:string,sketchfab_id?:string}):JSX.Element{
        if(sketchfab_id!==undefined && sketchfab_id){
            return(
                <>
                    <SketchfabBlock name={text} sketchfab_id={sketchfab_id}></SketchfabBlock>
                    <h3 className={"block-text"}>{text}</h3>
                </>
            ) 
        }
        else{
            return(
                <>
                    <img src={src} alt="loading?" className={"block-image image-size"}/>
                    <h3 className={"block-text"}>{text}</h3>
                </>
            ) 

        }
    }
    if (props.href===undefined||props.href.length===0){
        return (
            <div className={"main-block"} ref={ref}>
                <ImgText src={props.src} text={props.name} sketchfab_id={props.sketchfab_id} ></ImgText>
            </div>
        )
    }
    else{
        return(
            <a href={props.href}className={"main-block"} ref={ref} target="_blank"  rel="noopener noreferrer">
                <ImgText src={props.src} text={props.name} sketchfab_id={props.sketchfab_id} ></ImgText>
            </a>
        )
    }
})
function ImageBlockList (props:propsType){
    let lastscrollTop:number=0;
    const ref=useRef(null);
    function sc(e:any){
        console.log()
        let dx=Math.abs(lastscrollTop-e.target.scrollTop);
        lastscrollTop =e.target.scrollTop;
        let tem=(e.target.scrollTop+e.target.clientHeight/2)/e.target.scrollHeight*16
        tem=Math.floor(tem)
    }
    
    let space:BlockInfo={
        src:"",
        href:"",
        name:""
    }
    let infos:BlockInfo[] = [space,...props.info,space]
    let childRefs:React.RefObject<any>[]=[];
    for(let i = 0; i <infos.length; i++){
        childRefs.push(React.createRef())
    }
    console.log(childRefs)
    
    
    return(
        // <div className="mask-gradient flex flex-row w-4/5 mx-auto">
            <div className={"icon-container mb-5"} onScroll={sc} ref={ref}>
                {/* <ImageBlock  ref={childRefs[props.info.length]} {...space}/> */}
                {props.info.map(function(value,index){
                    // console.log(value.sketchfab_id,index)
                    return <ImageBlock  key={index} ref={childRefs[index]} {...value}/>
                })}
                {/* <ImageBlock  ref={childRefs[props.info.length]} {...space}/> */}

            </div>
        // </div>
    )
}

export default ImageBlockList;

