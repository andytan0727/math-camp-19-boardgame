import React, { Component } from "react";
import { connect } from "react-redux";
import { Stage } from 'react-konva';

// Imported actionsCreators
import { startGame } from "./actions/gameActions";
import { addNewPlayer } from "./actions/playerActions";

// Import canvas components
import CanvasGrid from './components/canvas/CanvasGrid';


import "./Game.css";
import { Canvas } from "konva";

class Game extends Component {
  render() {
    // States
    const { width, height } = this.props.board;
    const { gameNum } = this.props.game;
    const { count, current, all: allPlayers } = this.props.players;

    // Actions
    const { startGame, addNewPlayer } = this.props;

    return (
      <div className="Game">
        <React.Fragment>
          <div id={'main-board'}>
            <Stage width={width} height={height}>
              <CanvasGrid grid={this.props.board}>

              </CanvasGrid>
            </Stage>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { board, game, players } = state;
  return {
    board,
    game,
    players
  };
};

export default connect(
  mapStateToProps,
  { // mapDispatchToProps object literal
    // game
    startGame,

    // players
    addNewPlayer
  }
)(Game);
