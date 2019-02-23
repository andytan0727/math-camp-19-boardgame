import React from "react";
import { Layer, Group, Rect, Text } from "react-konva";
import styles from "../../styles/CanvasGrid.module.css";

// Interfaces
import { ILayout, ITileDim } from "../../store/board/types";

// Interfaces
interface CanvasGridBoxProps {
  boxId: string;
  layout: ILayout;
  boxWidth: number;
  boxHeight: number;
}

interface CanvasGridProps {
  grid: {
    layout: ILayout;
    box: ITileDim;
  };
}

class CanvasGridBox extends React.PureComponent<CanvasGridBoxProps, {}> {
  render() {
    const { boxId, layout, boxWidth, boxHeight } = this.props;
    const { darkRed, paleRed } = styles;

    const isEven: boolean = !(parseInt(boxId) % 2);

    return (
      <Group>
        <Rect
          x={Math.floor(layout[boxId].x - boxWidth / 2)}
          y={Math.floor(layout[boxId].y - boxWidth / 2)}
          width={boxWidth}
          height={boxHeight}
          fill={isEven ? darkRed : paleRed}
          perfectDrawEnabled={false}
        />
        <Text
          x={Math.floor(layout[boxId].x - boxWidth / 2)}
          y={Math.floor(layout[boxId].y - boxWidth / 2)}
          fill={isEven ? paleRed : darkRed}
          text={boxId}
          padding={4}
          fontSize={16}
          fontFamily={"arial"}
          perfectDrawEnabled={false}
        />
      </Group>
    );
  }
}

class CanvasGrid extends React.Component<CanvasGridProps, {}> {
  render() {
    const {
      layout,
      box: { width: boxWidth, height: boxHeight }
    } = this.props.grid;

    return (
      <Layer clearBeforeDraw={true}>
        {Object.keys(layout).map((box: string) => {
          return (
            <CanvasGridBox
              key={`box_${box}`}
              boxId={box}
              layout={layout}
              boxWidth={boxWidth}
              boxHeight={boxHeight}
            />
          );
        })}
      </Layer>
    );
  }
}

export default CanvasGrid;
