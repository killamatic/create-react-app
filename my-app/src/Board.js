import React from 'react';
import Square from './Square';
import './Board.css';

export default class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selected: null,
        debug: 1,
    };
    }
    
    handleClick(i){
        this.setState({selected: i});
        this.props.gameSelectionHandler(i);
    }
    
    renderSquare(i) {
      return (
                <Square 
                    value= {this.props.squares[i]}
                    onClick = {() => {this.handleClick(i)}}
                    css = {this.state.selected===i? "selected-square": ""}
                />
            );
    }
  
    render() { 
      return (
        <div>
          {/* <div className="status">{status}</div> */}
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }