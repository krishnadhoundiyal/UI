import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import Box from "@material-ui/core/Box";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { AiFillGithub, AiFillDelete, AiFillSetting } from 'react-icons/ai';
import { SiKubernetes, SiApacheairflow, SiJupyter } from 'react-icons/si';
import { GrDocumentConfig } from 'react-icons/gr';
import { TiDelete } from 'react-icons/ti';
import { ModalErrors } from './modal';
import { RequestHandler } from './request';
import { getAirFlowConfig } from './airflowConfig';
import { Divider } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { IDocumentManager } from '@jupyterlab/docmanager';
import factoryVar  from './reflect';
const useStyles = makeStyles((theme) => ({
  iconstyles: {
    paddingLeft: "10px",
    color : "rgb(75 70 70 / 67%)",
    minWidth: "44px"
  },
  texteffect : {
    minWidth: "25px",
    fontFamily: "-webkit-pictograph",

  },

  contextmenuListItems: {
    padding: "0px !important",
    paddingRight: "8px !important",
      maxHeight: "30px"
  }
}));
export const ContextMenu = (props): JSX.Element => {
  //const [menuItems, setMenuItems] = React.useState(null);
  const [anchorEl,setAnchorEl] = React.useState<null | HTMLElement>(props.anchorelement);
  const [openLogDialog,setopenLogDialog] = useState(false);
  const classes = useStyles();
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
        task_id : props.nodeid
      };
      // Testing
      /*payloadItems['dag_id'] = 'Dag_generated_Explorer2b2e8e29-b074-4907-b4c2-15a15bac17cb4343';
      payloadItems['dag_run_id'] = 'Dag_generated_Explorer2b2e8e29-b074-4907-b4c2-15a15bac17cb4343';
      payloadItems['task_id'] = '3b7cf0d315bf45ea820ed29ee4687ca7';
      */
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
  if(type === "Details") {
    let configAirflow = getAirFlowConfig();
    let payloadItems = {
      'cos-endpoint' : configAirflow["StorageEndpoint"],
      'cos-username': configAirflow["StorageUsername"],
    "cos-password": configAirflow["StoragePassword"],
    "cos-bucket": configAirflow["StorageBucket"],
      'directory' : props.dag_info.dag_id,
      'filename' : props.configurationObject[props.nodeid]["jupyterFilePath"]
    };
    // Testing
    /*payloadItems['dag_id'] = 'Dag_generated_Explorer2b2e8e29-b074-4907-b4c2-15a15bac17cb4343';
    payloadItems['dag_run_id'] = 'Dag_generated_Explorer2b2e8e29-b074-4907-b4c2-15a15bac17cb4343';
    payloadItems['task_id'] = '3b7cf0d315bf45ea820ed29ee4687ca7';
    */
    let serverPromise = RequestHandler.makePostRequest( 'explorersdev/getProcessedNotebook',
    JSON.stringify(payloadItems)).then(response =>{
      //props.handleLogItems(response);
      //setAnchorEl(null);
      let temp_obj = {
        'error' : response.file,
        'traceback': "File " + response.file + " downloaded from cloud and available on the directory - " + response.directory,
        'details' : response.file
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
          let divid = index.toString() + "contextmenu";
          return (
            <div key={divid}>
            <MenuItem
              onClick={(event) => handleclick(event,itemX.text)}
              key={index.toString()}
              className={classes.contextmenuListItems}
            >
            <ListItemIcon classes={{root:classes.iconstyles}}>
            {itemX.text == "Configure" && (
              <AiFillSetting />
            )}
            {itemX.text == "View Logs" && (
              <SiApacheairflow />
            )}
            {itemX.text == "Details" && (
              <SiJupyter />
            )}
            {itemX.text == "Remove" && (
              <AiFillDelete />
            )}

            </ListItemIcon>
              <ListItemText  >
              <Typography variant="overline" classes={{root:classes.texteffect}} >
  {itemX.text}
</Typography>


              </ListItemText>

            </MenuItem>
            {index  < menuItemsObtained.length -1 && (
              <Divider />
            )}

            </div>


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
