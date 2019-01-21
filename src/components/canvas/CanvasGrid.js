import React from "react";
import { Layer, Group, Rect, Text } from "react-konva";

const darkRed = "#ff7373";
const paleRed = "#ffe4e1";

export default class CanvasGrid extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
    console.log('Grid unmounted!');
    this.gridLayer.destroy();
  }

  render() {
    const {
      layout,
      box: { width: boxWidth, height: boxHeight }
    } = this.props.grid;

    return (
      <Layer ref={node => (this.gridLayer= node)}>
        {Object.keys(layout).map(box => {
          const isEven = !(box % 2);

          return (
            <Group key={`box_${box}`}>
              <Rect
                x={Math.floor(layout[box].x - boxWidth / 2)}
                y={Math.floor(layout[box].y - boxWidth / 2)}
                width={boxWidth}
                height={boxHeight}
                fill={isEven ? darkRed : paleRed}
                perfectDrawEnabled={false}
              />
              <Text
                x={Math.floor(layout[box].x - boxWidth / 2)}
                y={Math.floor(layout[box].y - boxWidth / 2)}
                fill={isEven ? paleRed : darkRed}
                text={box}
                padding={4}
                fontSize={16}
                fontFamily={"arial"}
                perfectDrawEnabled={false}
              />
            </Group>
          );
        })}
      </Layer>
    );
  }
}
