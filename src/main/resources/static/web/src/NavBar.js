import React from "react";
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
import { Route, HashRouter, NavLink } from "react-router-dom";
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

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <NavLink to="/">
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Players" />
          </NavLink>
        </StyledMenuItem>
        <StyledMenuItem>
          <NavLink to="/web/games">
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Games" />
          </NavLink>
        </StyledMenuItem>
        <StyledMenuItem>
          <NavLink to="/web/game">
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Game view" />
          </NavLink>
        </StyledMenuItem>

        <StyledMenuItem>
          <NavLink to="/web/ranking">
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Ranking" />
          </NavLink>
        </StyledMenuItem>

        <StyledMenuItem>
          <NavLink to="/web/signup">
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Sign Up" />
          </NavLink>
        </StyledMenuItem>

        <StyledMenuItem>
          <NavLink to="/web/login">
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="login" />
          </NavLink>
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemIcon onClick={logOut}>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
