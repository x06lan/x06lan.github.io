import "./Icon_block.css"
function Icon_block(props){
    return (
        <a href={props.data.href}className="block_div">
            <img src={props.data.src} className="icon_image"/>
            <h3 className="icon_title">{props.data.name}</h3>
        </a>
    )
}

function Icon_block_list(props){
    return (
        <div className="block_list container">
            {props.datas.map(function(item,index){
                return <Icon_block key={index} data={item}/>
            })}
        </div>
    )
}
export default Icon_block_list;
