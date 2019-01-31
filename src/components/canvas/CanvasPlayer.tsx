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

interface ICoord {
  x: number;
  y: number;
}
interface ICoordAndWidth {
  coord: ICoord;
  width: number;
}

interface DimensionTextProps extends ICoordAndWidth {
  id: number;
  color: string;
}
interface PlayerToAnimateProps extends ICoordAndWidth {
  id: number;
  color: string;
  scale: number;
  render: ({ id, width, coord, color }: DimensionTextProps) => React.ReactNode;
}

interface CanvasPlayerProps {
  player: ISinglePlayerObj;
  current: ISinglePlayerObj;
  layout: ILayout;
  box: ITileDim;
}

const DimensionText = (props: DimensionTextProps) => {
  const { id, coord, width, color } = props;
  let x: number;
  let y: number;
  let fontSize: number;

  if (width / 2 > 30) {
    x = id % 10 !== 0 ? coord.x - 7 : coord.x - 14.5;
    y = coord.y - 11;
    fontSize = 23;
  } else {
    x = id % 10 !== 0 ? (id === 1 ? coord.x - 5 : coord.x - 4) : coord.x - 9;
    y = coord.y - 7;
    fontSize = 14;
  }

  return (
    <animated.Text
      x={x}
      y={y}
      fill={color}
      text={id.toString()}
      fontSize={fontSize}
      fontFamily={"arial"}
      fontStyle={"Bold"}
      perfectDrawEnabled={false}
    />
  );
};

const PlayerToAnimate = (props: PlayerToAnimateProps) => {
  const { id, coord, width, color, scale, render } = props;
  return (
    <animated.Group>
      <animated.Circle
        x={coord.x}
        y={coord.y}
        radius={width / 2 - 10}
        fill={styles.white}
        scale={{ x: scale, y: scale }}
        stroke={color}
        strokeWidth={4}
        perfectDrawEnabled={false}
      />
      {render({ id, width, coord, color })}
    </animated.Group>
  );
};

export default class CanvasPlayer extends React.Component<
  CanvasPlayerProps,
  {}
> {
  render() {
    const {
      player: { id, pos, color },
      // current: { id: currentPlayerId },
      layout,
      box,
      box: { width }
    } = this.props;
    const grid = { layout, box };

    const coord = getPlayerCoordinates(pos.toString(), grid);
    const { x, y } = coord;
    // const isCurrent = !!(id === currentPlayerId);

    return (
      <Layer>
        <Spring
          from={{ scale: 1 }}
          to={{ x, y, scale: 1.5 }}
          after={{ scale: 1 }}
        >
          {({ x, y, scale }) => (
            <PlayerToAnimate
              id={id}
              coord={{ x, y }}
              width={width}
              color={color}
              scale={scale}
              render={({ id, width, coord, color }) => (
                <DimensionText
                  id={id}
                  width={width}
                  coord={coord}
                  color={color}
                />
              )}
            />
          )}
        </Spring>
      </Layer>
    );
  }
}
