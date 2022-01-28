import "./Image_block.css"
import Sketchfab_block from "./Sketchfab_block"
function Image_block(props){
    if (props.data.sketchfab_id!= null){
        return (
            <a href={props.data.href}className="block_div">
                    <Sketchfab_block  item_id={props.data.sketchfab_id}/>
                <h3 className="block_title">{props.data.name}</h3>
            </a>
        )
    }
    else{
        return (
            <a href={props.data.href}className="block_div">
                    <img className="block_image"src={props.data.src}/>
                <h3 className="block_title">{props.data.name}</h3>
            </a>
        )
    }
}

function Image_block_list(props){
    return (
        <div className="block_list container">
            {props.datas.map(function(item,index){
                return <Image_block key={index} data={item}/>
            })}
        </div>
    )
}
export default Image_block_list;
