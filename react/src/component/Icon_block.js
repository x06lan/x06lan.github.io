import "./Icon_block.css"
import React, { Component }  from 'react';
class Icon_block extends Component{
    render() {
        return(
        <a href={this.props.data.href}className="block_div" target="_blank"  rel="noopener noreferrer">
            <img src={this.props.data.src} className="icon_image"/>
            <h3 className="icon_title">{this.props.data.name}</h3>
        </a>
        )
    }
}
class Icon_block_list extends Component {
    render(){
        return(
        <div className="block_list container">
            {this.props.datas.map(function(item,index){
                return <Icon_block key={index} data={item}/>
            })}
        </div>
        )
    }
}
export default Icon_block_list;
