import React from "react";
import { Spring, animated } from "react-spring/konva";
import {
  // Circle,
  Layer
  // Group,
  // Text
} from "react-konva";
import { getPlayerCoordinates } from "../../utils/helpers/playerHelpers";
import styles from "../../styles/CanvasPlayer.module.css";

// Interfaces
import { ILayout, ITileDim } from "../../store/board/types";
import { ISinglePlayerObj } from "../../store/player/types";

interface ConnectedProps {
  player: ISinglePlayerObj;
  current: ISinglePlayerObj;
  layout: ILayout;
  box: ITileDim;
}

interface OwnProps {}

type CanvasPlayerProps = ConnectedProps & OwnProps;

export default class CanvasPlayer extends React.Component<
  CanvasPlayerProps,
  {}
> {
  render() {
    const {
      player: { id, pos, color },
      current: { id: currentPlayerId },
      layout,
      box,
      box: { width }
    } = this.props;
    const grid = { layout, box };

    const { x, y } = getPlayerCoordinates(pos, grid);
    const isCurrent = !!(id === currentPlayerId);

    return (
      <Layer>
        <Spring to={{ x, y }}>
          {({ x, y }) => (
            <animated.Group>
              <animated.Circle
                x={x}
                y={y}
                radius={width / 2 - 10}
                fill={isCurrent ? styles.white : color}
                stroke={color}
                strokeWidth={2}
                perfectDrawEnabled={false}
              />
              <animated.Text
                x={id % 10 !== 0 ? x - 5 : x - 11}
                y={y - 7}
                fill={isCurrent ? color : styles.white}
                text={id.toString()}
                fontSize={18}
                fontFamily={"arial"}
                perfectDrawEnabled={false}
              />
            </animated.Group>
          )}
        </Spring>
      </Layer>
    );
  }
}
