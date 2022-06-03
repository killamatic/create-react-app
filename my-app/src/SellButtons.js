import React from "react";
import Resource from './Resource.js';

export default class TopBar extends React.Component {
    render() {
      return (
        <div>
            <Resource value= {this.props.resourcesString(0)}/>
            <button
            onClick= {() => {this.props.sellResource(0,1)}}
            >sell<br />1</button>                
            <button
            onClick= {() => {this.props.sellResource(0,this.props.resources[0])}}
            >sell<br />All</button>
        </div>
      );
    }
  }