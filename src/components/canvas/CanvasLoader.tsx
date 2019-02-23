import React from "react";
import { Segment, Placeholder } from "semantic-ui-react";

const CanvasLoader = (props: {}) => (
  <Segment loading placeholder size={"massive"} style={{ height: "100%" }}>
    <Placeholder fluid inverted>
      <Placeholder.Image square />
    </Placeholder>
  </Segment>
);

export default CanvasLoader;
