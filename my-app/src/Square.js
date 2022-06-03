import React from 'react';
import './Square.css';
export default class Square extends React.Component {
    constructor(props){
        super(props);
        this.state={
            index: this.props.index,
        };
    }
    clickHandler(){
        this.props.onClick(1);
    };

    render() {
      return (
        <button 
        // className="square" 
        className={"square " + this.props.css}
        onClick= {() => {this.clickHandler()}}
         >
         {this.props.value}
        </button>
      );
    }
  }