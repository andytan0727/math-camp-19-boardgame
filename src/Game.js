import React, { Component } from "react";
import { connect } from "react-redux";
import { Stage } from "react-konva";
import styled from "styled-components";
import { Container, Grid, Header, Divider, Segment } from "semantic-ui-react";

// Imported actionsCreators
import { changeDimensions } from "./actions/boardActions";
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
  testing = () => {
    this.container.scrollIntoView(false);
  }

  handleResize = () => {
    const { changeDimensions } = this.props;
    const width = this.container.offsetWidth;
    changeDimensions(width);
  };

  componentDidMount() {
    this.container.scrollIntoView(false);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    console.log("Game unmounted");
    this.stage.destroy();
  }

  render() {
    // States
    const {
      grid: { width, height }
    } = this.props.board;

    // Actions

    return (
      <MainBoardDiv id={"main-game"}>
        <React.Fragment>
          <Grid centered columns={2}>
            <Grid.Column width={11}>
              <div
                className={"main-board"}
                ref={node => (this.container = node)}
              >
                <Stage
                  width={width}
                  height={height}
                  ref={node => (this.stage = node)}
                >
                  <CanvasGrid grid={this.props.board} />
                </Stage>
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <Container>
                <Segment.Group>
                  <Segment>
                    <Header as="h2" content={"Math Camp"} />
                  </Segment>
                  <Segment>
                    Commodo ipsum est deserunt culpa ullamco consequat labore
                    esse est magna enim. Duis veniam in ex non. Ullamco id
                    tempor officia consequat excepteur dolore dolor sint
                    excepteur consectetur. Cillum commodo magna ea velit ut
                    laborum quis. Dolor ut magna ea voluptate. Fugiat voluptate
                    elit qui fugiat exercitation officia. Aliquip mollit
                    pariatur amet aliquip voluptate sit enim et nulla nulla.
                  </Segment>
                  <Segment>
                    <button onClick={this.testing}>Click Me</button>
                  </Segment>
                </Segment.Group>
              </Container>
            </Grid.Column>
          </Grid>
        </React.Fragment>
      </MainBoardDiv>
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
    // board
    changeDimensions,

    // game
    startGame,

    // players
    addNewPlayer
  }
)(Game);
