
import "./block.css"
export type BlockInfo={
    src: string;
    name: string;
    href?: string;
    sketchfab_id?: string;
    time?:number;
}
type propsType ={
    info: BlockInfo[];
}
function IconBlock(props:BlockInfo){
    // let blockStyle=["mx-1","backdrop-blur-lg"]
    function ImgText({src,text}:{src:string,text:string}):JSX.Element{
        return(
            <>
                <img src={src} alt="loading?" className={"block-image icon-size icon-animation bg-white"}/>
                <h3 className={"block-text"}>{text}</h3>
            </>
        ) 
    }
    if (props.href===undefined||props.href.length===0){
        return (
            <div className={"main-block"}>
                <ImgText src={props.src} text={props.name} ></ImgText>
            </div>
        )
    }
    else{
        return(
            <a href={props.href}className={"main-block"} target="_blank"  rel="noopener noreferrer">
                <ImgText src={props.src} text={props.name} ></ImgText>
            </a>
        )
    }
}
function IconBlockList (props:propsType){
    console.log(props)
    return(
        <div className={"icon-container mb-5"} >
            {props.info.map(function(value,index){
                return <IconBlock key={index} {...value}/>
            })}
        </div>
    )
}

export default IconBlockList;
