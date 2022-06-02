import React from "react";

//TODO: return a component that contains all the resources as a top of page bar
export default class Resource extends React.Component {
    render() {
      return (
        <div 
          className="resource" 
         >
         {this.props.value}
        </div>
      );
    }
  }