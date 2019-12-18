import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./Hitpoints.css";
import HpBar from "./HpBar";
export default function Hitpoints(props) {
  function createHitpoints() {
    switch (props.dmg) {
      case 0:
        return <HpBar hp={100} />;

      case 1:
        return <HpBar hp={93} />;

      case 2:
        return <HpBar hp={86} />;

      case 3:
        return <HpBar hp={79} />;

      case 4:
        return <HpBar hp={72} />;

      case 5:
        return <HpBar hp={65} />;

      case 6:
        return <HpBar hp={58} />;

      case 7:
        return <HpBar hp={51} />;

      case 8:
        return <HpBar hp={44} />;

      case 9:
        return <HpBar hp={37} />;

      case 10:
        return <HpBar hp={30} />;

      case 11:
        return <HpBar hp={23} />;

      case 12:
        return <HpBar hp={16} />;

      case 13:
        return <HpBar hp={9} />;

      case 14:
        return <HpBar hp={0} />;
    }
  }
  return (
    <Container>
      <Row item style={{ width: "300px" }}>
        {" "}
        {createHitpoints()}
      </Row>
    </Container>
  );
}
