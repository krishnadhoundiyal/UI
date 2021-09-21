import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
const useStyles = makeStyles((theme) => ({}));
export const ContextMenu = (props): JSX.Element => {
  //const [menuItems, setMenuItems] = React.useState(null);
  const [anchorEl,setAnchorEl] = React.useState<null | HTMLElement>(props.anchorelement);
  const menuItemsObtained = [
    {
      text: "Configure",
      cssclass: "contextMenu-configure",
    },
    {
      text: "Remove",
      cssclass: "contextMenu-configure",
    },
    {
      text: "View Logs",
      cssclass: "contextMenu-configure",
    },
    {
      text: "Details",
      cssclass: "contextMenu-configure",
    },
  ];

  const handleClose = () => {
    setAnchorEl(null);
    props.removeelementcallback();
  };
  const handleclick = (event,type) => {
    if(type === "Configure") {
      props.handleDrawerOpen();
      setAnchorEl(null);
    }
  }
  return (
    <React.Fragment>
      <Menu
        id="context-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItemsObtained.map((itemX, index) => {
          return (
            <MenuItem
              onClick={(event) => handleclick(event,itemX.text)}
              key={index.toString()}
              className="contextmenuListItems"
            >
              <ListItemText className="contextmenu">
                <Box display="flex" flexDirection="row">
                  <Box p={1}>
                    <div className={itemX.cssclass}> </div>
                  </Box>
                  <Box p={1} className="textcontextMenu">
                    {itemX.text}
                  </Box>
                </Box>
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
};
