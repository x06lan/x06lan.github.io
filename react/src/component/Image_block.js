import "./Image_block.css"
import Sketchfab_block from "./Sketchfab_block"
import React, { Component }  from 'react';
class Image_block  extends Component {
    render(){
        if (this.props.data.sketchfab_id!= null){
            return (
                <a href={this.props.data.href}className="block_div" target="_blank"  rel="noopener noreferrer">
                        <Sketchfab_block  item_id={this.props.data.sketchfab_id}/>
                    <h3 className="block_title">{this.props.data.name}</h3>
                </a>
            )
        }
        else{
            return (
                <a href={this.props.data.href}className="block_div" target="_blank"  rel="noopener noreferrer">
                        <img className="block_image"src={this.props.data.src} alt="not net"/>
                    <h3 className="block_title">{this.props.data.name}</h3>
                </a>
            )
        }
    }
}
class Image_block_list extends Component{
    render(){
        return (
            <div className="block_list container">
                {this.props.datas.map(function(item,index){
                    return <Image_block key={index} data={item}/>
                })}
            </div>
        )
    }
}
export default Image_block_list;
