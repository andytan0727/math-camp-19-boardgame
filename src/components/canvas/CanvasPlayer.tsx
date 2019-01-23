import React from "react";
import { Motion, spring } from "react-motion";
import { Circle, Layer, Group, Text } from "react-konva";
import { getPlayerCoordinates } from "../../utils/helpers/playerHelpers";
import styles from "../../styles/CanvasPlayer.module.css";

// Interfaces
import { ILayout, ITileDim } from "../../store/board/types";
import { ISinglePlayerObj } from "../../store/player/types";

interface CanvasPlayerProps {
  player: ISinglePlayerObj;
  current: ISinglePlayerObj;
  layout: ILayout;
  box: ITileDim;
}

export default class CanvasPlayer extends React.Component<
  CanvasPlayerProps,
  {}
> {
  render() {
    const {
      player: { id, pos, color, boxPosition },
      current: { id: currentPlayerId },
      layout,
      box,
      box: { width }
    } = this.props;
    const grid = { layout, box };

    const { x, y } = getPlayerCoordinates(pos, grid, boxPosition);
    const isCurrent = !!(id === currentPlayerId);

    return (
      <Layer>
        <Motion
          style={{
            x: spring(x, { stiffness: 70, damping: 14 }),
            y: spring(y, { stiffness: 70, damping: 20 })
          }}
        >
          {({ x, y }) => (
            <Group>
              <Circle
                x={x}
                y={y}
                radius={width / 2 - 10}
                fill={isCurrent ? styles.white : color}
                stroke={color}
                strokeWidth={2}
                perfectDrawEnabled={false}
              />
              <Text
                x={id % 10 !== 0 ? x - 5 : x - 11}
                y={y - 7}
                fill={isCurrent ? color : styles.white}
                text={id.toString()}
                fontSize={18}
                fontFamily={"arial"}
                perfectDrawEnabled={false}
              />
            </Group>
          )}
        </Motion>
      </Layer>
    );
  }
}
