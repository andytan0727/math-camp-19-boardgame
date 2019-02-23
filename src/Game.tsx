import React from "react";
import { connect } from "react-redux";
import { Stage } from "react-konva";
import { Grid, Header, Segment, Button } from "semantic-ui-react";
import { isEqual, debounce } from "lodash";
import {
  initializeWatcher,
  isElectron,
  getGameDataFolder,
  readJSONData,
  writeJSONData
} from "./utils/helpers/electronHelpers";
import { delay } from "./utils/helpers/gameHelpers";
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
  toggleBeginCurrentGame,
  restoreGame
} from "./store/game/action";
import {
  addNewPlayer,
  updateCurrentGameScore,
  moveOncePerPlayer,
  changePlayer,
  restorePlayers
} from "./store/player/action";
import {
  getStartGame,
  getCurrentGame,
  getGameData,
  getBonusPos,
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
import RestoreGameModal from "./components/panel/RestoreGameModal";

// CSS Styles
import styles from "./styles/Game.module.css";

// Interfaces
import { ISinglePlayerObj } from "./store/player/types";
import { AppState } from "./store";
import { FSWatcher } from "chokidar";
import { ILayout, IGridDim, ITileDim } from "./store/board/types";
import { IBonusPos } from "./store/game/types";

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
  curGamePrevData: Array<number>;
  gameData: Array<number>;
  bonusPos: IBonusPos;

  // Player
  count: number;
  allPlayers: Array<ISinglePlayerObj>;
  currentPlayer: ISinglePlayerObj;
  curPlayerScore: number;
  curPlayerPos: number;
}

interface ConnectedDispatch {
  // Board dispatch
  changeDimensions: typeof changeDimensions;
  setBoardScale: typeof setBoardScale;
  setGridDimension: typeof setGridDimension;

  // Game dispatch
  initializeData: typeof initializeData;
  updateData: typeof updateData;
  setGame: typeof setGame;
  startGame: typeof startGame;
  toggleBeginCurrentGame: typeof toggleBeginCurrentGame;
  restoreGame: typeof restoreGame;

  // Player dispatch
  addNewPlayer: typeof addNewPlayer;
  updateCurrentGameScore: typeof updateCurrentGameScore;
  moveOncePerPlayer: typeof moveOncePerPlayer;
  changePlayer: typeof changePlayer;
  restorePlayers: typeof restorePlayers;
}

type Props = OwnProps & ConnectedDispatch & Selectors;

let watchFileListener: Promise<FSWatcher> | undefined;

// Main component
class Game extends React.Component<Props, { openModal: boolean }> {
  private mainBoard: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      // Restore game modal
      openModal: false
    };
    this.mainBoard = React.createRef();
  }

  setBoardDimensions = () => {
    const { changeDimensions } = this.props;
    const node = this.mainBoard.current;

    if (node) {
      const width = node.offsetWidth;
      changeDimensions(width);
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

  scrollToPlayer = () => {
    const y = this.props.layout[this.props.curPlayerPos.toString()].y;

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
  };

  toggleModalOpenClose = () => {
    this.setState(prevState => ({
      openModal: !prevState.openModal
    }));
  };

  handleRestoreGame = async () => {
    const { restoreGame, restorePlayers } = this.props;
    const fs = await import("fs");
    const path = await import("path");
    const dataFolder = await getGameDataFolder();
    let prevStoredGameData;

    try {
      prevStoredGameData = fs
        .readFileSync(path.join(dataFolder, "backup.json"))
        .toString();
    } catch (error) {
      console.error(`Error in reading backup.json: ${error}`);
    }

    if (prevStoredGameData) {
      const parsedGameData = JSON.parse(prevStoredGameData);
      restoreGame(parsedGameData["game"]);
      restorePlayers(parsedGameData["players"]);
      console.log("Restored game!");
    }
  };

  // Per player
  mainGameLogic = async () => {
    const {
      // layout,
      moveOncePerPlayer,
      changePlayer
    } = this.props;

    // Move player according to score/extra
    moveOncePerPlayer();
    this.scrollToPlayer();

    changePlayer();
  };

  handleGamePlay = async (data: Array<number>) => {
    const {
      // Selector state
      updateData,
      updateCurrentGameScore,
      curGamePrevData,

      // Action
      toggleBeginCurrentGame
    } = this.props;

    // Don't perform game play if there is no changes in scores
    if (isEqual(data, curGamePrevData)) {
      console.log("No change in file.");
      return;
    }

    updateCurrentGameScore(data);

    // Begin game
    toggleBeginCurrentGame();

    for (let i = 0; i < 10; i++) {
      await this.mainGameLogic();

      if (i === 9) {
        setTimeout(() => {
          // End game and update data
          toggleBeginCurrentGame();
          updateData(data);

          // Write file to be restored if unexpected bug happens
          writeJSONData({
            game: {
              // currentGame: this.props.curGame,
              gameData: this.props.gameData
            },
            players: {
              current: this.props.currentPlayer,
              all: this.props.allPlayers
            }
          });
        }, 4000);
      }

      await delay(1500);
    }
  };

  componentDidMount() {
    const {
      // Actions
      initializeData
      // setGame
    } = this.props;

    // Initialize board size and coordinates when mounted
    this.setBoardDimensions();

    // Scroll to first player (bottom)
    setTimeout(this.scrollToPlayer, 2000);

    // Update dimensions accordingly when resize
    window.addEventListener("resize", debounce(this.handleResize, 500));

    // File change listener
    watchFileListener = isElectron ? initializeWatcher() : undefined;

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
                initializeData(gameDataJson);
              }
            })
            .on(
              "change",
              debounce(async path => {
                let rawGameData;
                try {
                  rawGameData = await readJSONData(path);
                } catch (error) {
                  console.log(`Error: ${error}`);
                }

                if (rawGameData && this.props.isGameStarted) {
                  const jsonData = JSON.parse(rawGameData);
                  console.log("Updating data..");

                  // Perform game play and then update previous game data
                  this.handleGamePlay(jsonData);
                }
              }, 1500)
            )
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
      layout,
      grid,
      box,
      boardScale,
      bonusPos,
      allPlayers,
      currentPlayer,
      beginCurGame
    } = this.props;

    // Selectors
    const { width, height } = this.props.grid;
    const board = {
      layout,
      grid,
      box
    };

    const { openModal: open } = this.state;

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
                  <CanvasScore layout={layout} pos={bonusPos} />
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
                    <Button
                      negative
                      content={"Restore Game"}
                      onClick={this.toggleModalOpenClose}
                    />
                  </Button.Group>
                  <RestoreGameModal
                    open={open}
                    handleClose={this.toggleModalOpenClose}
                    handleRestore={this.handleRestoreGame}
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
    beginCurGame: getBeginCurrentGame(state),
    curGamePrevData: getCurrentGamePreviousData(state),
    gameData: getGameData(state),
    bonusPos: getBonusPos(state),

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
    restoreGame,

    // players
    addNewPlayer,
    updateCurrentGameScore,
    moveOncePerPlayer,
    changePlayer,
    restorePlayers
  }
)(Game);
