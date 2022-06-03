import React from 'react';
import Board from './Board.js';
import TopBar from './TopBar.js';
import Resource from './Resource.js'; 
import './index.css';
//import Timer from './Timer.js';

export default class Game extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            //store the count of how many resources you have available
            resources: [20,7,10,20],
            //not changing, holds the amount of resources that a tile will contribute to the resources array
            constResourceIncrement: [5,7,10,20],
            //the amount of money that should be gained for selling one of each kind of resource
            sellValue: [1,2,3,4],
            //resource names
            resourceNames: ["Slag","Shiny Rocks", "Copper", "Money"],
            //the amount of resources needed to set each kind of tile
            constTileCost: [5,7,10,20],
            //not changing, All of the possible tiles that can be in the game board
            constTiles: ['A','B','C','D'],
            //update on updating a tile, for easy calculation of resource increase
            tilesCount: Array(4).fill(0),            
            //The grid that makes up the game board
            squares: Array(9).fill(null),

            //have an array of size squares.length that holds an array of indexes that point to the square, and one value of where this square points to

            //What is currently selected as a type to be put as a peice on the game board
            play: 0,
            //a turn counter
            selection: 0,

            //location in resources array that stores money
            moneyIndex: 3,

            //timer state holding
            minutes: 0,
            seconds: 0,

            debug: 1,
        };
    }

    consolePrint(printout){
        if(this.state.debug){
            console.log(printout);
        };
    }

    resourcesString(index){
        return this.state.resourceNames[index] + " " + this.state.resources[index] + " | ";
    }

    sellResource(index, amount){
        //if there is enough resource to sell the amount selected, sell it
        if(this.state.resources[index] >= amount){
            //decrease the amount of resource sold
            this.removeValueToResources(index, amount);
            //figure out the amount of money that should be gained
            let moneyGained = this.state.sellValue[index] * amount;
            //increase money
            this.addValueToResources(this.state.moneyIndex, moneyGained);
        };
    }

    //set play to be the kind of tile from tiles that was selected
    selectTileType(typeIndex){
        this.consolePrint("Game: tile type " + this.state.constTiles[typeIndex] + " select button pressed");
        this.setState({play: typeIndex});
    }

    setTilesCountValue(i, value){
        this.consolePrint("3: setTilesCountValue, at position: " + i + " currentValue: " + this.state.tilesCount[i] + " value: " + value);
        this.setState(state => {
            const tilesCount = [...state.tilesCount];
            this.consolePrint("3: replacement: " + tilesCount);
            tilesCount[i] = value;
            this.consolePrint("3: replacement: " + tilesCount);
            return ({
                tilesCount
            });
        });
        this.consolePrint("3.1: after updating values, currentValue: " + this.state.tilesCount[i] + " value: " + value);

    }

    //At location i in the resources array, add the value given
    addValueToResources(i, value){
        this.setState(state => {
            let resources = [...state.resources];
            this.consolePrint("3.0: replacement: " + resources[i] + "\nvalue: " + value);
            resources[i] = state.resources[i] + value;
            this.consolePrint("3.1: replacement: " + resources[i]);
            return ({
                resources
            });
        });
    }

    //At location i in the resources array, remove the value given
    removeValueToResources(i, value){
        this.setState(state => {
            let resources = [...state.resources];
            this.consolePrint("3.0: replacement: " + resources[i] + "\nvalue: " + value);
            resources[i] = state.resources[i] - value;
            this.consolePrint("3.1: replacement: " + resources[i]);
            return ({
                resources
            });
        });
    }

    //When the square value has to be updated to the new value
    //set value at i to be new value, as well as update the tilesCount array
    setSquareValue(i, value){
        this.consolePrint("2: setSquareValue, currentValue: " + this.state.squares[i] + " value: " + value);
        let currentValue = this.state.squares[i];
        //if there is already a value, figure out what it is, and remove that value from the tiles count array
        if(currentValue !== null){
            this.consolePrint("2.1: the value at index i was not null");
            //find the index in constTiles that has the correct value
            this.state.constTiles.forEach((element, index) => {
                //TODO: turn this into a turnary
                //found the previous index, update the tileCount array to have one less
                if(element === currentValue){
                    this.consolePrint("2.1.1.0: there are "+ this.state.tilesCount[index] + " of type " + this.state.constTiles[index]);
                    let newValue = this.state.tilesCount[index] - 1;
                    this.consolePrint("2.1.1.0.1 newvalue: " + newValue);
                    this.setTilesCountValue(index, newValue);
                    this.consolePrint("2.1.1: the element: "+ element + " is equal to currenValue: "+ currentValue + " and the index of constTiles: " + index +" newValue: " + newValue);
                }
                if(element === value){
                    this.consolePrint("2.1.2.0: there are "+ this.state.tilesCount[index] + " of type " + this.state.constTiles[index]);
                    let newValue = this.state.tilesCount[index] + 1;
                    this.setTilesCountValue(index, newValue);
                    this.consolePrint("2.1.2: the element: "+ element + " is equal to value: "+ value + " and the index of constTiles: " + index);
                }
            });
        }
        //the square doesn't have a value
        else{
            this.consolePrint("2.2: the value at index i was null, only add to the tilesCount array");
             //find the index in constTiles that has the correct value
             this.state.constTiles.forEach((element, index) => {
                //when the index is found, use that to update tilesCount arrays count at index
                if(element === value){
                    let newValue = this.state.tilesCount[index] + 1;
                    this.setTilesCountValue(index, newValue);
                    this.consolePrint("2.2.1: the element: "+ element + " is equal to value: "+ value + " and the index of constTiles: " + index + "and the tilesCountValue was increased");
                }
            });
        }


        this.setState(state => {
            let squares = [...state.squares];
            this.consolePrint("3.0: replacement: " + squares[i] + "\nvalue: " + value);
            squares[i] = value;
            this.consolePrint("3.1: replacement: " + squares[i]);
            return ({
                squares
            });
        });
    }

    //anytime a square is changed
    //change state so that the grid is populated with correct kind of value
    squareUpdated(index){
        if(this.state.constTiles[this.state.play] !== this.state.squares[index]){
            this.consolePrint("1.1: they are different, the update should go here");
            //make sure there is enough resource to place the tile
            if(this.state.resources[this.state.play] >= this.state.constTileCost[this.state.play]){
                //remove cost of the tile
                this.removeValueToResources(this.state.play, this.state.constTileCost[this.state.play])
                //update the square array with the new value at index position
                this.setSquareValue(index, this.state.constTiles[this.state.play]);
            }
        }
        else{
            this.consolePrint("1.2: the updated type: " + this.state.constTiles[this.state.play] + ", the current type: " + this.state.squares[index] + ", they are the same, do nothing");
        }


    }

    //TODO: add the popup to the right that gives the squares information
    //any time a square was clicked
    //selection of the square has happened
    squareSelected(index){
        this.setState({selection: index});
        this.consolePrint("selected square: " + index);
    }

    updateButtonHandler(){
        this.consolePrint("clicked update button");
        this.squareUpdated(this.state.selection);
    }

    //any time the clock says time to update
    //on specified clock tick, increase the resources array 
    resourcesUpdated(){
        //how many resources to update
        this.consolePrint("ResourcesUpdated: tilesCount: " + this.state.tilesCount);
        this.addValueToResources(0, this.state.tilesCount[0] * this.state.constResourceIncrement[0]);
        this.addValueToResources(1, this.state.tilesCount[1] * this.state.constResourceIncrement[1]);
        this.addValueToResources(2, this.state.tilesCount[2] * this.state.constResourceIncrement[2]);
        this.addValueToResources(3, this.state.tilesCount[3] * this.state.constResourceIncrement[3]);
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            if(this.state.seconds === 10){
                this.consolePrint("looping");
                //update the resources based on the time specified
                this.resourcesUpdated();
                //restart the counter
                this.setState({seconds: 0});
            }
            else{
                this.consolePrint("incrementing");
                this.setState(({ seconds }) => ({
                    seconds: seconds + 1
                }));
            }
        }, 1000)
    }

    // componentDidMount() {
    //     this.myInterval = setInterval(() => {
    //         if(this.state.seconds === 60){
    //             this.setState(({ minutes }) => ({
    //                 minutes: minutes + 1
    //             }));
    //             this.setState(({ seconds }) => ({
    //                 seconds: 0
    //             }));
    //         }
    //         else{
    //             this.setState(({ seconds }) => ({
    //                 seconds: seconds + 1
    //             }));
    //         }
    //     }, 1000)
    // }

    render() {
        const { minutes, seconds } = this.state
      return (
        <div>
            <div 
            className="row-display" 
            >
                <Resource value= {this.resourcesString(0)}/>
                <Resource value= {this.resourcesString(1)}/>
                <Resource value= {this.resourcesString(2)}/>
                <Resource value= {this.resourcesString(3)}/>
                {/* <div>
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
                </div> */}
            </div>
            <div>
                <div className="row-display">
                    {/* Game board */}
                    <div className="game-board">
                        <Board 
                            gameSelectionHandler= {(index) => this.squareSelected(index)}
                            squares= {this.state.squares}
                        />
                    </div>
                    {/* right side info on the selection */}
                    <div className="game-info">
                        <div>Tile types</div>
                        <button onClick = {() => this.selectTileType(0)}>
                            Miner<br />
                            {this.state.tilesCount[0]}
                        </button>
                        <button onClick = {() => this.selectTileType(1)}>
                            Sifter<br />
                            {this.state.tilesCount[1]}
                        </button>
                        <button onClick = {() => this.selectTileType(2)}>
                            Smelter<br />
                            {this.state.tilesCount[2]}
                        </button>
                        <button onClick = {() => this.selectTileType(3)}>
                            tile type D<br />
                            {this.state.tilesCount[3]}
                        </button>
                    </div>
                    <button
                        onClick={() => {this.updateButtonHandler()}}
                    >
                        update selection
                    </button>
                </div>
            
                <button>start time</button>
                <button>end   time</button>
                <div>
                Time Remaining: { minutes }:{ seconds }
                </div>
            </div>
        </div>
      );
    }
  }