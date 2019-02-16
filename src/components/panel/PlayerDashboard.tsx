import React from "react";
import { List } from "semantic-ui-react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { orderBy } from "lodash";

// Interfaces
import { ISinglePlayerObj } from "../../store/player/types";

// import styles from "../../styles/PlayerDashboard.module.css";

interface PlayerDashboardProps {
  beginCurGame: boolean;
  allPlayers: Array<ISinglePlayerObj>;
  current: ISinglePlayerObj;
}

export default class PlayerDashboard extends React.PureComponent<
  PlayerDashboardProps,
  {}
> {
  render() {
    const { beginCurGame, allPlayers, current } = this.props;
    const allPlayersPos = allPlayers.map(player => player.pos);

    const curPlayerId = current.id !== 1 ? current.id - 1 : current.id + 9;

    return (
      <Flipper flipKey={allPlayersPos.join("")}>
        <List divided relaxed verticalAlign={"middle"} size={"big"}>
          {orderBy(allPlayers, "pos", "desc").map(player => {
            return (
              <Flipped key={player.id} flipId={player.id.toString()}>
                <List.Item
                  style={
                    player.id === curPlayerId && beginCurGame
                      ? {
                          boxSizing: "border-box",
                          width: "100%",
                          border: `3px solid ${player.color}`,
                          padding: "10px 20px"
                        }
                      : {}
                  }
                >
                  <List.Content verticalAlign={"middle"} floated="right">
                    <p
                      style={{
                        paddingTop: 5,
                        color:
                          player.path[player.path.length - 2] &&
                          player.pos - player.path[player.path.length - 2] > 0
                            ? "green"
                            : player.path[player.path.length - 2] &&
                              player.pos - player.path[player.path.length - 2] <
                                0
                            ? "red"
                            : "black"
                      }}
                    >
                      {player.path[player.path.length - 2] || 1}{" "}
                      <List.Icon
                        name={"long arrow alternate right"}
                        color={
                          player.path[player.path.length - 2] &&
                          player.pos - player.path[player.path.length - 2] > 0
                            ? "green"
                            : player.path[player.path.length - 2] &&
                              player.pos - player.path[player.path.length - 2] <
                                0
                            ? "red"
                            : "black"
                        }
                        size={"large"}
                        verticalAlign={"middle"}
                      />
                      {player.pos}
                    </p>
                  </List.Content>
                  <List.Icon
                    name="user"
                    color={
                      player.color as
                        | "red"
                        | "orange"
                        | "yellow"
                        | "olive"
                        | "green"
                        | "teal"
                        | "blue"
                        | "violet"
                        | "purple"
                        | "pink"
                        | "brown"
                        | "grey"
                        | "black"
                        | undefined
                    }
                    size="large"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header>{`Player ${player.id}`}</List.Header>
                    <List.Description>{"Current Position:"}</List.Description>
                  </List.Content>
                </List.Item>
              </Flipped>
            );
          })}
        </List>
      </Flipper>
    );
  }
}
