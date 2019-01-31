import React from "react";
import { connect } from "react-redux";
import { Stage } from "react-konva";
import { Grid, Header, Segment, Button } from "semantic-ui-react";
import _ from "lodash";
import {
  isElectron,
  getGameDataFolder,
  readJSONData
} from "./utils/helpers/electronHelpers";
import {
  changeDimensions,
  setBoardScale,
  setGridDimension
} from "./store/board/action";
import {
  startGame,
  initializeData,
  updateData,
  setGame
} from "./store/game/action";
import {
  addNewPlayer,
  updateCurrentGameScore,
  movePlayer,
  moveOncePerPlayer,
  changePlayer
} from "./store/player/action";
import {
  getStartGame,
  getCurrentGame,
  getCurrentGamePreviousData,
  getCurrentPlayerScore,
  getCurrentLayout,
  getGridDimensions,
  getBoxDimensions,
  getBoardScale,
  getCount,
  getAllPlayers,
  getCurrentPlayer,
  getCurrentPlayerPos
} from "./store/selector";

// Components
import CanvasGrid from "./components/canvas/CanvasGrid";
import CanvasPlayer from "./components/canvas/CanvasPlayer";
import CanvasScore from "./components/canvas/CanvasScore";
import PlayerDashboard from "./components/panel/PlayerDashboard";
import styles from "./styles/Game.module.css";

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
  boardScale: number;
  isGameStarted: boolean;
  curGame: number;
  curGamePrevData: IScoresAll;
  count: number;
  allPlayers: Array<ISinglePlayerObj>;
  currentPlayer: ISinglePlayerObj;
  curPlayerScore: number;
  curPlayerPos: number;
}

interface ConnectedDispatch {
  // Game dispatch
  initializeData: typeof initializeData;
  updateData: typeof updateData;
  setGame: typeof setGame;
  startGame: typeof startGame;

  // Grid dispatch
  changeDimensions: typeof changeDimensions;
  setBoardScale: typeof setBoardScale;
  setGridDimension: typeof setGridDimension;

  // Player dispatch
  addNewPlayer: typeof addNewPlayer;
  updateCurrentGameScore: typeof updateCurrentGameScore;
  movePlayer: typeof movePlayer;
  moveOncePerPlayer: typeof moveOncePerPlayer;
  changePlayer: typeof changePlayer;
}

type Props = OwnProps & ConnectedDispatch & Selectors;

let watchFileListener: Promise<FSWatcher> | undefined;
let gameDataFolder: string;
// let timeout: any;

// Main component
class Game extends React.Component<Props, {}> {
  private mainBoard: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.mainBoard = React.createRef();
  }

  setBoardDimensions = () => {
    const { changeDimensions } = this.props;
    const node = this.mainBoard.current;

    if (node) {
      const width = node.offsetWidth;
      changeDimensions(width);
      node.scrollIntoView(false);
    }
  };

  handleResize = () => {
    const node = this.mainBoard.current;

    if (node) {
      const width = node.clientWidth;
      const { setBoardScale, setGridDimension } = this.props;
      setBoardScale(width);

      // Renew the grid dimension for future resize
      setGridDimension(width);
    }
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

  mainGameLogic = (scoreType: string) => {
    const { layout, moveOncePerPlayer, changePlayer } = this.props;
    moveOncePerPlayer(this.props.curGame, scoreType);

    // Scroll to focus on current player
    const y = layout[this.props.curPlayerPos.toString()].y;

    if (y > 140) {
      window.scrollTo({
        top: y - 110,
        behavior: "smooth"
      });
    } else {
      window.scrollTo({
        top: y - 30,
        behavior: "smooth"
      });
    }

    changePlayer();
  };

  handleGamePlay = (data: Array<IScoresAll>) => {
    const {
      updateData,
      updateCurrentGameScore,
      curGamePrevData,
      curGame
      // movePlayer,
      // moveOncePerPlayer,
      // changePlayer
    } = this.props;

    const scoreType: string | undefined = _.isEqual(
      curGamePrevData.score,
      data[curGame - 1].score
    )
      ? _.isEqual(curGamePrevData.extra, data[curGame - 1].extra)
        ? undefined
        : "extra"
      : "score";

    // Don't perform game play if there is no changes in scores
    if (!scoreType) {
      console.log("No change in file.");
      return;
    }

    updateCurrentGameScore(curGame, data);

    // Main game logic
    for (let i = 1; i <= 10; i++) {
      setTimeout(() => {
        this.mainGameLogic(scoreType!);

        if (i === 10) {
          updateData(data);
        }
      }, 2000 * i);
    }
  };

  componentDidMount() {
    const {
      // Actions
      initializeData,
      setGame
      // updateData
    } = this.props;

    // Initialize board size and coordinates when mounted
    this.setBoardDimensions();

    // Update dimensions accordingly when resize
    // window.addEventListener("resize", _.debounce(this.setBoardDimensions, 500));
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
                const gameDataJson = JSON.parse(rawGameData);

                // Dispatch an action to Redux
                initializeData(gameDataJson["gameScores"]);
              }
            })
            .on("change", async path => {
              const rawGameData = await readJSONData(path);

              if (rawGameData && this.props.isGameStarted) {
                const jsonData = JSON.parse(rawGameData);
                const gameData = jsonData["gameScores"];
                const curGameNum: number = jsonData["curGame"];
                console.log("Updating data..");

                // Dispatch actions
                setGame(curGameNum);

                // Perform game play and then update previous game data
                this.handleGamePlay(gameData);
              }
            })
            .on("unlink", path => console.log(`File ${path} has been deleted`));
        })
        .catch(err => console.error(`Error occurred: ${err}`));
    }
  }

  componentWillUpdate() {
    console.log("Game: receiving props...");
  }

  componentDidUpdate() {
    console.log("Game: Updated");
  }

  componentWillUnmount() {
    // Remove resize listener
    window.removeEventListener("resize", this.setBoardDimensions);

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
      addNewPlayer,
      startGame,

      // Selector state
      boardScale
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
        <Grid centered columns={2} divided>
          <Grid.Column width={10}>
            <div ref={this.mainBoard}>
              {width && (
                <Stage
                  width={width}
                  height={height}
                  scaleX={boardScale}
                  scaleY={boardScale}
                >
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
                  <CanvasScore />
                </Stage>
              )}
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <div className={styles.playerSidePanel}>
              <Segment.Group>
                <Segment>
                  <Header as="h2" content={"Math Camp"} />
                </Segment>
                <Segment>
                  <PlayerDashboard />
                  {this.props.count === 10 ? (
                    <Button disabled>Click Me</Button>
                  ) : (
                    <Button onClick={addNewPlayer}>Click Me</Button>
                  )}
                </Segment>
                <Segment>
                  {/* <Input
                      focus
                      placeholder={"Game"}
                      onChange={this.handleInput}
                    /> */}
                  <Button
                    toggle
                    active={this.props.isGameStarted}
                    content={"Start Game"}
                    onClick={startGame}
                  />
                </Segment>
              </Segment.Group>
            </div>
          </Grid.Column>
        </Grid>
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
    boardScale: getBoardScale(state),

    // Game
    isGameStarted: getStartGame(state),
    curGame: getCurrentGame(state),
    curGamePrevData: getCurrentGamePreviousData(state),

    // Players
    count: getCount(state),
    allPlayers: getAllPlayers(state),
    currentPlayer: getCurrentPlayer(state),
    curPlayerScore: getCurrentPlayerScore(state),
    curPlayerPos: getCurrentPlayerPos(state)
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
    setBoardScale,
    setGridDimension,

    // game
    startGame,
    initializeData,
    updateData,
    setGame,

    // players
    addNewPlayer,
    updateCurrentGameScore,
    movePlayer,
    moveOncePerPlayer,
    changePlayer
  }
)(Game);
