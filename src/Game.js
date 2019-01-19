import React, { Component } from "react";
import { connect } from "react-redux";
import { startGame } from "./actions/gameActions";
import "./Game.css";

class Game extends Component {
  render() {
    const { gameNum } = this.props.game;
    const { startGame } = this.props;
    return (
      <div className="Game">
        <h1>Math Camp Board Game</h1>
        <p onClick={startGame}>
          This game is {gameNum}.
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { game } = state;
  return {
    game
  };
};

export default connect(
  mapStateToProps,
  {
    startGame
  }
)(Game);
