import React from "react";
import { Spring, animated } from "react-spring/konva";
import { Layer } from "react-konva";
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
  isCurrent: boolean;
}
interface PlayerToAnimateProps extends ICoordAndWidth {
  id: number;
  color: string;
  isCurrent: boolean;
  render: ({ id, width, coord, color }: DimensionTextProps) => React.ReactNode;
}

interface CanvasPlayerProps {
  player: ISinglePlayerObj;
  current: ISinglePlayerObj;
  layout: ILayout;
  box: ITileDim;
  beginCurGame: boolean;
}

const DimensionText = (props: DimensionTextProps) => {
  const { id, coord, width, color, isCurrent } = props;
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
      fill={isCurrent ? color : styles.white}
      text={id.toString()}
      fontSize={fontSize}
      fontFamily={"arial"}
      fontStyle={"Bold"}
      perfectDrawEnabled={false}
    />
  );
};

const PlayerToAnimate = (props: PlayerToAnimateProps) => {
  const { id, coord, width, color, isCurrent, render } = props;
  return (
    <animated.Group>
      <animated.Circle
        x={coord.x}
        y={coord.y}
        radius={width / 2 - 10}
        fill={isCurrent ? styles.white : color}
        stroke={color}
        strokeWidth={4}
        perfectDrawEnabled={false}
      />
      {render({ id, width, coord, color, isCurrent })}
    </animated.Group>
  );
};

export default class CanvasPlayer extends React.PureComponent<
  CanvasPlayerProps,
  {}
> {
  render() {
    const {
      player: { id, pos, color },
      current,
      layout,
      box,
      box: { width },
      beginCurGame
    } = this.props;
    const grid = { layout, box };

    const coord = getPlayerCoordinates(pos.toString(), grid);
    const { x, y } = coord;
    const curPlayerId = id === 10 ? current.id + 9 : current.id - 1;
    const isCurrent = id === curPlayerId && beginCurGame;

    return (
      <Layer>
        <Spring to={{ x, y }}>
          {({ x, y }) => (
            <PlayerToAnimate
              id={id}
              coord={{ x, y }}
              width={width}
              color={color}
              isCurrent={isCurrent}
              render={({ id, width, coord, color, isCurrent }) => (
                <DimensionText
                  id={id}
                  width={width}
                  coord={coord}
                  color={color}
                  isCurrent={isCurrent}
                />
              )}
            />
          )}
        </Spring>
      </Layer>
    );
  }
}
