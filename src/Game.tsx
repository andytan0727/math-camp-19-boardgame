import React, { Component } from "react";
import { connect } from "react-redux";
import { Stage } from "react-konva";
import { Grid, Header, Segment, Button, Container } from "semantic-ui-react";
import _ from "lodash";
import {
  isElectron,
  getGameDataFolder,
  readJSONData
} from "./utils/helpers/electronHelpers";
import { changeDimensions } from "./store/board/action";
import { startGame } from "./store/game/action";
import { addNewPlayer } from "./store/player/action";
import CanvasGrid from "./components/canvas/CanvasGrid";
import CanvasPlayer from "./components/canvas/CanvasPlayer";
import styles from "./styles/Game.module.css";

// Interfaces
import { AppState } from "./store";
import { FSWatcher } from "chokidar";

interface OwnProps {}

interface ConnectedDispatch {
  changeDimensions: typeof changeDimensions;
  addNewPlayer: typeof addNewPlayer;
}

type Props = OwnProps & AppState & ConnectedDispatch;

let watchFileListener: Promise<FSWatcher> | undefined;
let gameDataFolder: string;

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

  initializeWatcher = async () => {
    const chokidar = await import("chokidar");
    gameDataFolder = await getGameDataFolder();
    const watcher = chokidar.watch(gameDataFolder, {
      ignored: /[\/\\]\./,
      persistent: true
    });
    return watcher;
  };

  getAppState = async () => {
    const { remote } = await import("electron");
    return remote.app.getPath("userData");
  };

  componentDidMount() {
    // Using ! to remove undefined/null from type definition
    // Scroll to bottom initially
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
                // const gameDataJson = JSON.parse(rawGameData);
              }
            })
            .on("change", async path => {
              console.log(`File ${path} has been changed`);
              // TODO
              const rawGameData = await readJSONData(path);
              if (rawGameData) {
                console.log(rawGameData);
              } else {
                console.log("The file changed is not sample.json");
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
    // States
    const {
      // States
      board: {
        layout,
        grid: { width, height },
        box
      },
      players: { count, all: allPlayers, current: currentPlayer },

      // Dispatches
      addNewPlayer
    } = this.props;

    return (
      <div className={styles.mainGame}>
        <React.Fragment>
          <Grid centered columns={2}>
            <Grid.Column width={12}>
              <div ref={this.mainBoard}>
                <Stage width={width} height={height}>
                  <CanvasGrid grid={this.props.board} />
                  {allPlayers.map((person, ind) => {
                    return (
                      <CanvasPlayer
                        key={`player_${ind}`}
                        player={person}
                        current={currentPlayer}
                        layout={layout}
                        box={box}
                      />
                    );
                  })}
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
                    <Container>
                      {count === 10 ? (
                        <Button disabled>Click Me</Button>
                      ) : (
                        <Button onClick={addNewPlayer}>Click Me</Button>
                      )}
                      {isElectron ? (
                        <Button
                          onClick={() =>
                            this.getAppState().then(data => console.log(data))
                          }
                        >
                          Home Folder
                        </Button>
                      ) : null}
                    </Container>
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
