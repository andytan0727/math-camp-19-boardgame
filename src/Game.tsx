import React, { Component } from "react";
import { connect } from "react-redux";
import { Stage } from "react-konva";
import { Grid, Header, Segment, Button, Input } from "semantic-ui-react";
import _ from "lodash";
import {
  isElectron,
  getGameDataFolder,
  readJSONData
} from "./utils/helpers/electronHelpers";
import { changeDimensions } from "./store/board/action";
import {
  startGame,
  initializeData,
  updateData,
  setGame
} from "./store/game/action";
import {
  addNewPlayer,
  addFile,
  updateCurrentGameScore,
  movePlayer
} from "./store/player/action";
import {
  getCurrentGame,
  getCurrentGameData,
  getCurrentPlayerScore,
  getCurrentLayout,
  getGridDimensions,
  getBoxDimensions,
  getCount,
  getAllPlayers,
  getCurrentPlayer
} from "./store/selector";
import CanvasGrid from "./components/canvas/CanvasGrid";
import CanvasPlayer from "./components/canvas/CanvasPlayer";
import styles from "./styles/Game.module.css";

// * TESTING !!!!
// import { updatePlayerScores } from './utils/helpers/playerHelpers';

// Interfaces
import { ISinglePlayerObj, IScoresAll } from "./store/player/types";
import { AppState } from "./store";
import { FSWatcher } from "chokidar";
import { ILayout, IGridDim, ITileDim } from "./store/board/types";
// import { updatePlayerScores } from "./utils/helpers/playerHelpers";

interface OwnProps {}

interface Selectors {
  layout: ILayout;
  grid: IGridDim;
  box: ITileDim;
  curGame: number;
  curGameData: IScoresAll;
  count: number;
  allPlayers: Array<ISinglePlayerObj>;
  currentPlayer: ISinglePlayerObj;
  curPlayerScore: number;
}

interface ConnectedDispatch {
  // Game dispatch
  initializeData: typeof initializeData;
  updateData: typeof updateData;
  setGame: typeof setGame;

  // Grid dispatch
  changeDimensions: typeof changeDimensions;

  // Player dispatch
  addNewPlayer: typeof addNewPlayer;
  addFile: typeof addFile;
  updateCurrentGameScore: typeof updateCurrentGameScore;
  movePlayer: typeof movePlayer;
}

type Props = OwnProps & ConnectedDispatch & Selectors;

let watchFileListener: Promise<FSWatcher> | undefined;
let gameDataFolder: string;
let timeout: any;

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

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let curGame: string | undefined = e.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      this.props.setGame(parseInt(curGame!));
      curGame = undefined;
    }, 500);
  };

  initializeWatcher = async () => {
    const chokidar = await import("chokidar");
    gameDataFolder = await getGameDataFolder();
    const watcher = chokidar.watch(gameDataFolder, {
      ignored: /[\/\\]\./,
      persistent: true
    });
    return watcher;
  };

  handleGamePlay = (data: Array<IScoresAll>) => {
    const { updateData, updateCurrentGameScore, movePlayer } = this.props;

    updateData(data);
    console.log(`Cur game: ${this.props.curGame}`);
    console.log(this.props.curGameData);
    updateCurrentGameScore(this.props.curGame, this.props.curGameData, data);
    movePlayer(this.props.curGame);
  };

  componentDidMount() {
    // Using ! to remove undefined/null from type definition
    // Scroll to bottom initially
    const {
      // Actions
      addFile,
      initializeData
      // updateData,
      // updateCurrentGameScore
    } = this.props;

    const node = this.mainBoard.current!;
    node.scrollIntoView(false);

    // Resize listener
    window.addEventListener("resize", _.debounce(this.handleResize, 500));

    // File change listener
    watchFileListener = isElectron ? this.initializeWatcher() : undefined;

    if (watchFileListener) {
      watchFileListener
        .then(watcher => {
          watcher
            .on("add", async path => {
              console.log(`File ${path} has been added`);
              const rawGameData = await readJSONData(path);

              if (rawGameData) {
                console.log(`File: ${rawGameData}`);
                const gameDataJson = JSON.parse(rawGameData);

                // Dispatch an action to Redux
                console.log(addFile);
                // addFile(gameDataJson);
                initializeData(gameDataJson);
              }
            })
            .on("change", async path => {
              const rawGameData = await readJSONData(path);

              if (rawGameData) {
                const jsonDat = JSON.parse(rawGameData);
                console.log("Updating data..");

                this.handleGamePlay(jsonDat);

                // Dispatch actions
                // updateData(jsonDat);
                // updateCurrentGameScore(
                //   this.props.curGame,
                //   this.props.curGameData
                // );
                // console.log(`Cur game: ${this.props.curGame}`);
                // console.log(
                //   `Current player data: ${this.props.curGameData.score}`
                // );
                // console.log(
                //   `Current player score: ${this.props.curPlayerScore}`
                // );
              }
            })
            .on("unlink", path => console.log(`File ${path} has been deleted`));
        })
        .catch(err => console.error(`Error occurred: ${err}`));
    }
  }

  componentWillUnmount() {
    // Remove resize listener
    window.removeEventListener("resize", this.handleResize);

    // Remove chokidar watch file listener
    if (watchFileListener) {
      watchFileListener
        .then(watcher => {
          watcher.close();
        })
        .catch(err => console.log(`Error occurred: ${err}`));
    }
  }

  render() {
    const {
      // Dispatches
      addNewPlayer
    } = this.props;

    // Selectors
    const { width, height } = this.props.grid;
    const board = {
      layout: this.props.layout,
      grid: this.props.grid,
      box: this.props.box
    };

    return (
      <div className={styles.mainGame}>
        <React.Fragment>
          <Grid centered columns={2}>
            <Grid.Column width={12}>
              <div ref={this.mainBoard}>
                <Stage width={width} height={height}>
                  <CanvasGrid grid={board} />
                  {this.props.allPlayers.map(
                    (person: ISinglePlayerObj, ind: number) => (
                      <CanvasPlayer
                        key={`player_${ind}`}
                        player={person}
                        current={this.props.currentPlayer}
                        layout={this.props.layout}
                        box={this.props.box}
                      />
                    )
                  )}
                </Stage>
              </div>
            </Grid.Column>
            <Grid.Column width={4}>
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
                    {this.props.count === 10 ? (
                      <Button disabled>Click Me</Button>
                    ) : (
                      <Button onClick={addNewPlayer}>Click Me</Button>
                    )}
                  </Segment>
                  <Segment>
                    <Input
                      focus
                      placeholder={"Game"}
                      onChange={this.handleInput}
                    />
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
  return {
    // Board
    layout: getCurrentLayout(state),
    grid: getGridDimensions(state),
    box: getBoxDimensions(state),

    // Game
    curGame: getCurrentGame(state),
    curGameData: getCurrentGameData(state),

    // Players
    count: getCount(state),
    allPlayers: getAllPlayers(state),
    currentPlayer: getCurrentPlayer(state),
    curPlayerScore: getCurrentPlayerScore(state)
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
    initializeData,
    updateData,
    setGame,

    // players
    addNewPlayer,
    addFile,
    updateCurrentGameScore,
    movePlayer
  }
)(Game);
