import React from 'react';
import Square from './Square';
import './Board.css';

export default class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        debug: 1,
      };
    }
    
    // consolePrint(printout){
    //     if(this.state.debug){
    //         console.log(printout);
    //     };
    // }

    // validTileSelect(i, turn){
    //     this.consolePrint(turn + ' turn');
    //     this.setState({turn: this.state.tiles[this.state.play]});
    //     this.setValue(i, turn);
    // }
    
    // handleClick(i){

    //     this.props.selectionHandler(i);
    //     //TODO: change this so that it is using a counter of if a selection has been made, and enough resources are available, and the selection has not already been done, set the tile to be what was selected
    //     // if(this.state.squares[i] === null){
    //     //     this.consolePrint('turn ' + this.state.turn);
    //     //     this.setState({turn: this.state.turn + 1});
    //     //     this.setSquareValue(i, this.state.play);
    //     // }
    // }
    
    renderSquare(i) {
      return (
                <Square 
                    value= {this.props.squares[i]}
                    onClick = {() => this.props.gameSelectionHandler(i)}
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