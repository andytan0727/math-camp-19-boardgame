import React, { Component } from "react";
import { connect } from "react-redux";
import { Stage } from "react-konva";
import styled from "styled-components";

// Imported actionsCreators
import { startGame } from "./actions/gameActions";
import { addNewPlayer } from "./actions/playerActions";

// Import canvas components
import CanvasGrid from "./components/canvas/CanvasGrid";

import "./Game.css";

const MainGameDiv = styled.div`
  margin: 0px,
  fontSize: 14px,
  color: '#2c475d',
  fontFamily: 'sans-serif',
`;

const MainBoardDiv = styled.div`
  display: inline-block;
  vertical-align: top;
  padding-left: 16px;
`;

class Game extends Component {
  componentDidMount() {
    const mainBoard = document.getElementById('main-board');
    mainBoard.scrollIntoView(false);  // scroll to bottom
  }

  componentWillUnmount() {
    console.log('Game unmounted');
  }

  render() {
    // States
    const { width, height } = this.props.board;

    // Actions

    return (
      <MainGameDiv id="main">
        <React.Fragment>
          <MainBoardDiv id={"main-board"}>
            <Stage width={width} height={height}>
              <CanvasGrid grid={this.props.board} />
            </Stage>
          </MainBoardDiv>
        </React.Fragment>
      </MainGameDiv>
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
  {
    // mapDispatchToProps object literal
    // game
    startGame,

    // players
    addNewPlayer
  }
)(Game);
