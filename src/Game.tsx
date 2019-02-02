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
  setGame,
  toggleBeginCurrentGame
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
  getCurrentPlayerPos,
  getBeginCurrentGame
} from "./store/selector";

// Components
import CanvasGrid from "./components/canvas/CanvasGrid";
import CanvasPlayer from "./components/canvas/CanvasPlayer";
import CanvasScore from "./components/canvas/CanvasScore";
import PlayerDashboard from "./components/panel/PlayerDashboard";

// CSS Styles
import styles from "./styles/Game.module.css";

// Interfaces
import { ISinglePlayerObj, IScoresAll } from "./store/player/types";
import { AppState } from "./store";
import { FSWatcher } from "chokidar";
import { ILayout, IGridDim, ITileDim } from "./store/board/types";

interface OwnProps {}

interface Selectors {
  // Board
  layout: ILayout;
  grid: IGridDim;
  box: ITileDim;
  boardScale: number;

  // Game
  isGameStarted: boolean;
  curGame: number;
  beginCurGame: boolean;
  curGamePrevData: IScoresAll;

  // Player
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
  toggleBeginCurrentGame: typeof toggleBeginCurrentGame;

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

  // Per player
  mainGameLogic = (scoreType: string) => {
    const {
      layout,
      moveOncePerPlayer,
      changePlayer
      // currentPlayer
    } = this.props;

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
      // Selector state
      updateData,
      updateCurrentGameScore,
      curGamePrevData,
      curGame,

      // Action
      toggleBeginCurrentGame
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

    // Begin game
    toggleBeginCurrentGame();

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        this.mainGameLogic(scoreType!);

        if (i === 9) {
          setTimeout(() => {
            // End game and update data
            toggleBeginCurrentGame();
            updateData(data);
          }, 1000);
        }
      }, 2000 * i);
    }
  };

  componentDidMount() {
    const {
      // Actions
      initializeData,
      setGame
    } = this.props;

    // Initialize board size and coordinates when mounted
    this.setBoardDimensions();

    // Update dimensions accordingly when resize
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
              let rawGameData;
              try {
                rawGameData = await readJSONData(path);
              } catch (error) {
                console.log(`Error: ${error}`);
              }

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
      boardScale,
      allPlayers,
      currentPlayer,
      beginCurGame
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
                  {allPlayers.map((person: ISinglePlayerObj) => (
                    <CanvasPlayer
                      key={`player_${person.id}`}
                      player={person}
                      current={currentPlayer}
                      layout={this.props.layout}
                      box={this.props.box}
                      beginCurGame={beginCurGame}
                    />
                  ))}
                  <CanvasScore />
                </Stage>
              )}
            </div>
          </Grid.Column>
          <Grid.Column width={6}>
            <div className={styles.playerSidePanel}>
              <Segment.Group>
                <Segment>
                  <Header as="h2" content={"Math Camp"} textAlign={"center"} />
                </Segment>
                <Segment>
                  <PlayerDashboard
                    beginCurGame={beginCurGame}
                    current={currentPlayer}
                    allPlayers={allPlayers}
                  />
                </Segment>
                <Segment textAlign={"center"}>
                  <Button.Group>
                    <Button
                      disabled={this.props.count === 10}
                      onClick={addNewPlayer}
                      content={"Add Player"}
                    />
                    <Button
                      toggle
                      active={this.props.isGameStarted}
                      content={"Start Game"}
                      onClick={startGame}
                    />
                    <Button negative content={"Reset Game"} />
                  </Button.Group>
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
    beginCurGame: getBeginCurrentGame(state),
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
    toggleBeginCurrentGame,

    // players
    addNewPlayer,
    updateCurrentGameScore,
    movePlayer,
    moveOncePerPlayer,
    changePlayer
  }
)(Game);
