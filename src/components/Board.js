import React from 'react';
import '../stylesheet/Board.css'
import Square from './Square';

export default class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
    }

    
  
    handleClick(i) {
      const squares = this.state.squares.slice();
      if(squares[i] == null){
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
      this.createSquare(i);
    }
    }
  
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
        
      );
    }

    createSquare(i){

        let header = new Headers();
            header.append('Content-Type', 'application/json');
            header.append('Accept', 'application/json');
        
        const requestOptions = {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                xoValue: this.state.xIsNext ? 'X' : 'O',
                index: i
            })
        };

       

        fetch("//localhost:8080/square/create" , requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                },
                (error) => {
                    console.log(error);
                }
            )
    }; 

    
  
    render() {
      const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
      return (
        <div>
          <div className="status">{status}</div>
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