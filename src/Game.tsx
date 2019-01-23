import React, { Component } from "react";
import { connect } from "react-redux";
import { Stage } from "react-konva";
import { Grid, Header, Segment } from "semantic-ui-react";

// Imported actionsCreators
import { changeDimensions } from "./store/board/action";
import { startGame } from "./store/game/action";
import { addNewPlayer } from "./store/player/action";

// Import canvas components
import CanvasGrid from "./components/canvas/CanvasGrid";

// CSS module
import styles from './Game.module.css';

// Interfaces
import { AppState } from "./store";

interface OwnProps {}

interface ConnectedDispatch {
  changeDimensions: typeof changeDimensions;
}

type Props = OwnProps & AppState & ConnectedDispatch;

// Main component
class Game extends Component<Props, {}> {
  private mainBoard: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.mainBoard = React.createRef();
  }

  handleResize = () => {
    const { changeDimensions } = this.props;
    const node = this.mainBoard.current;

    if (node) {
      const width = node.offsetWidth;
      changeDimensions(width);
    }
  };

  componentDidMount() {
    // Using ! to remove undefined/null from type definition
    const node = this.mainBoard.current!;
    node.scrollIntoView(false);
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    console.log("Game unmounted");
  }

  render() {
    // States
    const {
      grid: { width, height }
    } = this.props.board;

    return (
      <div className={styles.mainGame}>
        <React.Fragment>
          <Grid centered columns={2}>
            <Grid.Column width={11}>
              <div ref={this.mainBoard}>
                <Stage width={width} height={height}>
                  <CanvasGrid grid={this.props.board} />
                </Stage>
              </div>
            </Grid.Column>
            <Grid.Column width={5}>
              <div className={styles.playerSidePanel}>
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
                    {/* <button onClick={this.testing}>Click Me</button> */}
                  </Segment>
                </Segment.Group>
              </div>
            </Grid.Column>
          </Grid>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
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
    /**
     * mapDispatchToProps object literal
     */ 
    // board
    changeDimensions,

    // game
    startGame,

    // players
    addNewPlayer
  }
)(Game);
