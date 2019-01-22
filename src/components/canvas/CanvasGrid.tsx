import React, { Component } from "react";
import Konva from 'konva';
import { Layer, Group, Rect, Text, KonvaContainerComponent } from "react-konva";

// Interfaces
import { ILayout, ITileDim } from '../../store/board/types';

const darkRed = "#ff7373";
const paleRed = "#ffe4e1";

// Interfaces
interface OwnProps {}

interface ConnectedState {
  grid: {
    layout: ILayout;
    box: ITileDim;
  }
}

interface ConnectedDispatch {}

type Props = OwnProps & ConnectedState & ConnectedDispatch;

export default class CanvasGrid extends Component<Props, {}> {
  private gridLayer: React.RefObject<KonvaContainerComponent<Konva.Layer<Konva.Node>, Konva.LayerConfig>>;

  constructor(props: Props) {
    super(props);

    this.gridLayer = React.createRef();
  }

  componentDidMount() {
    console.log(this.gridLayer.current);
  }

  componentWillUnmount() {
    console.log('Grid unmounted!');
  }

  render() {
    const {
      layout,
      box: { width: boxWidth, height: boxHeight }
    } = this.props.grid;

    return (
      <Layer ref={this.gridLayer as any}>
        {Object.keys(layout).map((box: string) => {
          const isEven: boolean = !(parseInt(box) % 2);

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
