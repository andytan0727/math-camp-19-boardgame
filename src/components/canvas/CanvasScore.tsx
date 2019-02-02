import React from "react";
import { Layer } from "react-konva";
import { Spring, animated } from "react-spring/konva";

import "../../styles/CanvasScore.module.css";

interface CanvasScoreProps {}

interface ScoreTextProps {
  fontSize: number;
}

const ScoreText = (props: ScoreTextProps) => {
  // const { fontSize } = props;
  return (
    <React.Fragment>
      <animated.Text
        x={79}
        y={31}
        fill={"#F012BE"}
        text={"X2"}
        fontSize={28}
        fontFamily={"JellyCrazies"}
        stroke={"#85144b"}
        strokeWidth={3}
        perfectDrawEnabled={false}
      />
    </React.Fragment>
  );
};

class CanvasScore extends React.Component<CanvasScoreProps, {}> {
  render() {
    return (
      <Layer>
        <Spring to={{ fontSize: 50 }} after={{ fontSize: 30 }}>
          {({ fontSize }) => <ScoreText fontSize={fontSize} />}
        </Spring>
      </Layer>
    );
  }
}

export default CanvasScore;
