import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Login from "./Login";
import SignUp from "./SignUp";
import { withRouter } from "react-router-dom";
import { InfoContext } from "../../../InfoContext";

function NavBar(props, history) {
  const themecon = useContext(InfoContext);
  const { updateValue, logOut } = themecon;

  const [loginShow, setLoginShow] = React.useState(false);
  const [registerShow, setRegisterShow] = React.useState(false);

  let overlayTrigger = React.createRef();

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        {themecon.logged === null
          ? "Welcome Admiral! Please login"
          : "finish your Games before starting a new one"}
      </Popover.Content>
    </Popover>
  );
  function delay(methodes) {
    setTimeout(methodes, 300);
  }

  const lookForGame = () => {
    fetch("api/lookForGame", {
      method: "POST"
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(res => {
        if (res.gameId) {
          updateValue("gmId", res.gameId);
          props.history.push("/web/games");
          delay(props.history.push("/web/game_view"));
        } else {
          overlayTrigger.current.show();
        }
      });
  };

  return (
    <Navbar bg="light" expand="lg" className="navButtons">
      <Nav className="mr-auto">
        <Container>
          <Row>
            {/* ------------------------------------Login, Logout, Register------------------------ */}

            {themecon.logged === null ? (
              <Col>
                <Button variant="primary" onClick={() => setLoginShow(true)}>
                  Login
                </Button>

                <Login show={loginShow} onHide={() => setLoginShow(false)} />
              </Col>
            ) : (
              <Col>
                <Button variant="primary" onClick={() => logOut()}>
                  Logout
                </Button>
              </Col>
            )}
            {themecon.logged === null ? (
              <Col>
                <Button variant="primary" onClick={() => setRegisterShow(true)}>
                  Register
                </Button>

                <SignUp
                  show={registerShow}
                  onHide={() => setRegisterShow(false)}
                />
              </Col>
            ) : (
              <Col style={{ width: "110px" }}></Col>
            )}

            {/* //------------------------------------Leaderboard------------------------ */}

            <Col>
              <NavLink to="/web/ranking">
                <Button>Leaderboard</Button>
              </NavLink>
            </Col>

            {/* //------------------------------------Games------------------------ */}
            <Col>
              <NavLink to="/web/games">
                <Button>Games</Button>
              </NavLink>
            </Col>

            {/* //------------------------------------Play------------------------ */}

            <Col>
              <OverlayTrigger
                rootClose="true"
                rootCloseEvent="mousedown"
                ref={overlayTrigger}
                trigger="manual"
                placement="bottom"
                overlay={popover}
              >
                <Button onClick={lookForGame}>Play</Button>
              </OverlayTrigger>
            </Col>

            {/* <Col>
              <NavLink to="/web/babylon">
                <Button>Babylon</Button>
              </NavLink>
            </Col> */}
          </Row>
        </Container>
      </Nav>

      <Navbar.Brand href="/" className="pageTitle d-none d-lg-block">
        <img
          width="200px"
          height="auto"
          alt="bshioLogo"
          src="https://res.cloudinary.com/munnotubbel/image/upload/v1576591169/javaProject/bShip_u50r62.png"
        ></img>
        Battleships
      </Navbar.Brand>
    </Navbar>
  );
}

export default withRouter(NavBar);
