import React from "react";
import { Layer, Group, Rect, Text } from "react-konva";

// Interfaces
import { ILayout, ITileDim } from "../../store/board/types";

const darkRed = "#ff7373";
const paleRed = "#ffe4e1";

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

const CanvasGridBox = (props: CanvasGridBoxProps) => {
  const { boxId, layout, boxWidth, boxHeight } = props;

  const isEven: boolean = !(parseInt(boxId) % 2);

  return (
    <Group key={`box_${boxId}`}>
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
};

const CanvasGrid = (props: CanvasGridProps) => {
  const {
    layout,
    box: { width: boxWidth, height: boxHeight }
  } = props.grid;

  return (
    <Layer>
      {Object.keys(layout).map((box: string) => {
        <CanvasGridBox
          boxId={box}
          layout={layout}
          boxWidth={boxWidth}
          boxHeight={boxHeight}
        />;
      })}
    </Layer>
  );
};

export default CanvasGrid;