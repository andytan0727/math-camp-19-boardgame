import React, { Component } from "react";
import { Layer, Text } from "react-konva";

import "../../styles/CanvasScore.module.css";
import { ILayout } from "../../store/board/types";
import { IBonusPos } from "../../store/game/types";

interface CanvasScoreProps {
  layout: ILayout;
  pos: IBonusPos;
}

interface ScoreTextProps {
  x: number;
  y: number;
  text: string;
}

interface withXScoreProps {
  x: number;
  y: number;
}

const ScoreText = (props: ScoreTextProps) => {
  const { x, y, text } = props;
  return (
    <React.Fragment>
      <Text
        x={x}
        y={y}
        fill={"#F012BE"}
        text={text}
        fontSize={25}
        fontFamily={"JellyCrazies"}
        stroke={"#85144b"}
        strokeWidth={3}
        perfectDrawEnabled={false}
      />
    </React.Fragment>
  );
};

const withXScore = (text: string) => (Component: typeof ScoreText) => (
  props: withXScoreProps
) => {
  const { x, y } = props;

  return <Component text={text} x={x} y={y} />;
};

const X2ScoreText = withXScore("X2")(ScoreText);
const X4ScoreText = withXScore("X4")(ScoreText);

class CanvasScore extends Component<CanvasScoreProps, {}> {
  render() {
    const { layout, pos: bonusPos } = this.props;
    const coordsX2 = bonusPos["x2"].map(({ pos }) => ({
      x: layout[pos].x,
      y: layout[pos].y
    }));
    const coordsX4 = bonusPos["x4"].map(({ pos }) => ({
      x: layout[pos].x,
      y: layout[pos].y
    }));

    return (
      <Layer>
        {coordsX2.map(({ x, y }, idx) => (
          <X2ScoreText key={`X2score_${idx}`} x={x - 35} y={y - 10} />
        ))}
        {coordsX4.map(({ x, y }, idx) => (
          <X4ScoreText key={`X4score_${idx}`} x={x - 30} y={y - 10} />
        ))}
      </Layer>
    );
  }
}

export default CanvasScore;
