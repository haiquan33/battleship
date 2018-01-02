import React, { Component } from 'react';
import './Room.css'
export default class Room extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.onCellHover = this.onCellHover.bind(this);
        this.onCellLeave = this.onCellLeave.bind(this);
        var cellColor = [];
        var cellMarked=[];
        for (var i = 0; i < 6; i++) {
            cellColor.push([]);
            cellMarked.push([])
            for (var j = 0; j < 6; j++) {

                cellColor[i][j] = "white";
                cellMarked[i][j]=false;

            }
        }





        this.state = {
            boardSize: 6,
            cellColor,
            cellMarked,
            isPlaying: false,
            isShipHorizon: true,
            pickingShipCell: 4,
            shipLeft: [0, 1, 0, 2, 2],
            canPlaceMore:true
            
        }

    }


    onCellHover(posx, posy) {
        var cellColor = this.state.cellColor;
        var cellMarked=this.state.cellMarked;
        if (this.state.isShipHorizon) {
            for (let i = 0; i < this.state.pickingShipCell; i++) {
                if (i + posy < this.state.boardSize) {
                    if (!cellMarked[posx][posy + i])
                        cellColor[posx][posy + i] = "yellow";
                    else cellColor[posx][posy + i] = "red";

                }
            }
        }

        this.setState({ cellColor });
    }

    onCellLeave(posx, posy) {
        var cellColor = this.state.cellColor;
        var cellMarked=this.state.cellMarked;
        if (this.state.isShipHorizon) {
            for (let i = 0; i < this.state.pickingShipCell; i++) {
                if (i + posy < this.state.boardSize) {
                    if (!cellMarked[posx][posy + i])
                        cellColor[posx][posy + i] = "white";
                    else cellColor[posx][posy + i] = "yellow";

                }
            }
        }
        this.setState({ cellColor });
    }

    handleClick(posx, posy) {
        var cellColor = this.state.cellColor;
        var cellMarked=this.state.cellMarked;
        var shipLeft=this.state.shipLeft;
        //if cant place  anyship
        if (!this.state.canPlaceMore) return;
        if (this.state.isShipHorizon) {
            //check if can place ship right here
            //not out of board
            if (posy + this.state.pickingShipCell > this.state.boardSize) return;
            //not place over any ship
            for (let i = 0; i < this.state.pickingShipCell; i++) {
                if (cellMarked[posx][posy+i]) return;

            }


            for (let i = 0; i < this.state.pickingShipCell; i++) {
                if (i + posy < this.state.boardSize) {
                    
                    cellColor[posx][posy + i] = "yellow";
                    cellMarked[posx][posy+i]=true;
                }
            }
            shipLeft[this.state.pickingShipCell]--;

        }


        if (shipLeft[this.state.pickingShipCell]==0)
        {
            if (this.state.pickingShipCell==4)
            this.setState({ cellColor,cellMarked,shipLeft,pickingShipCell:3 });
            if (this.state.pickingShipCell==3)
            this.setState({ cellColor,cellMarked,shipLeft,pickingShipCell:1 });
            if (this.state.pickingShipCell==1)
            this.setState({ cellColor,cellMarked,shipLeft,pickingShipCell:1,canPlaceMore:false });
        }
        else
        this.setState({ cellColor,cellMarked,shipLeft });
    }

    render() {
        var cells = [];



        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {

                cells.push(<div className="cell" style={{ background: this.state.cellColor[i][j], border: '1px solid black', }}
                    onClick={() => this.handleClick(i, j)}
                    onMouseEnter={() => this.onCellHover(i, j)}
                    onMouseLeave={() => this.onCellLeave(i, j)}
                >{i}{j}</div>)

            }

        }
        const board = <div className="boardContainer">
            {cells}
        </div>

        return (
            <div>
                {board}
            </div>
        )
    }
}