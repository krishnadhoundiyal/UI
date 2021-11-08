import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import { ModalErrors } from './modal';
import { RequestHandler } from './request';
import { getAirFlowConfig } from './airflowConfig';
const useStyles = makeStyles((theme) => ({}));
export const ContextMenu = (props): JSX.Element => {
  //const [menuItems, setMenuItems] = React.useState(null);
  const [anchorEl,setAnchorEl] = React.useState<null | HTMLElement>(props.anchorelement);
  const [openLogDialog,setopenLogDialog] = useState(false);
  const [logDetails,setlogDetails] = useState({
    'error' : '',
    'traceback': ''
  });
  const resetlogDetails = () => {
    let temp_obj = {
      'error' : '',
      'traceback': ''
    }

    setlogDetails(temp_obj);
    setopenLogDialog(false);
    props.removeelementcallback();
  }
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
    if(type === "View Logs") {
      let configAirflow = getAirFlowConfig();
      let payloadItems = {
        airflow_ip : configAirflow["AirflowEndpoint"],
        airflow_port: "30507",
        airflow_uname: configAirflow["AirflowUserName"],
        airflow_pass: configAirflow["AirflowPassword"],
        dag_id : props.dag_info.dag_id,
        dag_run_id :  props.dag_info.dag_run_id,
        task_id : props.nodeId
      };
      // Testing
      payloadItems['dag_id'] = 'Dag_generated_Explorer2b2e8e29-b074-4907-b4c2-15a15bac17cb4343';
      payloadItems['dag_run_id'] = 'Dag_generated_Explorer2b2e8e29-b074-4907-b4c2-15a15bac17cb4343';
      payloadItems['task_id'] = '3b7cf0d315bf45ea820ed29ee4687ca7';
      let serverPromise = RequestHandler.makePostRequest( 'explorersdev/getTaskLog',
      JSON.stringify(payloadItems)).then(response =>{
        //props.handleLogItems(response);
        //setAnchorEl(null);
        let temp_obj = {
          'error' : response.dag_id,
          'traceback': response.data
        }
        setlogDetails(temp_obj);
        setopenLogDialog(true);

    },reject => {
      console.log(reject);
      let temp_obj = {
        'error' : reject.message,
        'traceback': reject.traceback
      }
      setlogDetails(temp_obj);
      setopenLogDialog(true);
    });
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
      {openLogDialog && (
          <ModalErrors
            errorobject={logDetails}
            callback={resetlogDetails}
          />
        )}
    </React.Fragment>
  );
};
