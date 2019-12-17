import React, { Component, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import MenuIcon from "@material-ui/icons/Menu";
// import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { Route, HashRouter, NavLink } from "react-router-dom";
import GoBack from "./GoBack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Overlay from "react-bootstrap/Overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";
import PopoverContent from "react-bootstrap/PopoverContent";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import Login from "./Login";
import SignUp from "./SignUp";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [loginShow, setLoginShow] = React.useState(false);
  const [registerShow, setRegisterShow] = React.useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    fetch("/api/logout", {
      method: "POST"
    }).then(response => {
      if (response.status == 200) {
        console.log("logged out");
        window.location.reload();
      } else {
        console.log("something went wrong");
      }
    });
  };

  const lookForGame = () => {
    document.addEventListener("mousedown", overlayTrigger.current.hide());
    fetch("/api/lookForGame", {
      method: "POST"
    }).then(response => {
      if (response.status == 201) {
        window.location.reload();
      } else {
        overlayTrigger.current.show();
        console.log("something went wrong");
      }
    });
  };

  let overlayTrigger = React.createRef();

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        finish your created Game before starting a new one
      </Popover.Content>
    </Popover>
  );

  return (
    <Navbar bg="light" expand="lg">
      <Nav className="mr-auto">
        <Container>
          <Row>
            <Col>
              <NavLink to="/web/games">
                <Button>Games</Button>
              </NavLink>
            </Col>
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
            <Col>
              <NavLink to="/web/ranking">
                <Button>Leaderboard</Button>
              </NavLink>
            </Col>
            <Col>
              <Button variant="primary" onClick={() => setLoginShow(true)}>
                Login
              </Button>

              <Login show={loginShow} onHide={() => setLoginShow(false)} />
            </Col>
            <Col>
              {/* <Link to="/web/signup"><Button>Register</Button></Link> */}

              <Button variant="primary" onClick={() => setRegisterShow(true)}>
                Register
              </Button>

              <SignUp
                show={registerShow}
                onHide={() => setRegisterShow(false)}
              />
            </Col>
          </Row>
        </Container>
      </Nav>

      <Navbar.Brand href="/" className="pageTitle">
        <img
          width="200px"
          height="auto"
          src="https://res.cloudinary.com/munnotubbel/image/upload/v1576591169/javaProject/bShip_u50r62.png"
        ></img>
        Battleships
      </Navbar.Brand>
    </Navbar>
  );
}

export default NavBar;
