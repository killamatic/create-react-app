import React from "react";
import Resource from './Resource.js';
import SellButtons from './SellButtons.js';

export default class TopBar extends React.Component {


    render() {
      return (
        <div 
          className="row-display" 
         >
            {/* <TopBar 
            resourcesString = {() => {this.props.resourcesString(0)}}
            /> */}
            <div>
                <Resource value= {this.props.resourcesString(0)}/>
                <button
                onClick= {() => {this.props.sellResource(0,1)}}
                >sell<br />1</button>                
                <button
                onClick= {() => {this.props.sellResource(0,this.props.resources[0])}}
                >sell<br />All</button>
            </div>
            <div>
                <Resource value= {this.props.resourcesString(1)}/>
                <button
                onClick= {() => {this.props.sellResource(1,1)}}
                >sell<br />1</button>                
                <button
                onClick= {() => {this.props.sellResource(1,this.props.resources[1])}}
                >sell<br />All</button>
            </div>
            <div>
                <Resource value= {this.props.resourcesString(2)}/>
                <SellButtons />
                <button
                onClick= {() => {this.props.sellResource(2,1)}}
                >sell<br />1</button>                
                <button
                onClick= {() => {this.props.sellResource(2,this.props.resources[2])}}
                >sell<br />All</button>
            </div>
            <div>
                <Resource value= {this.props.resourcesString(3)}/>
                <button
                onClick= {() => {this.props.sellResource(0,1)}}
                >sell<br />1</button>                
                <button
                onClick= {() => {this.props.sellResource(0,this.props.resources[0])}}
                >sell<br />All</button>
            </div>
         {/* put all resource Components here */}
        </div>
      );
    }
  }