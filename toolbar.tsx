import AttachFileIcon from '@material-ui/icons/AttachFile';
import Grid from '@material-ui/core/Grid';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import SettingsIcon from '@material-ui/icons/Settings';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import ViewListIcon from '@material-ui/icons/ViewList';
import GetAppIcon from '@material-ui/icons/GetApp';
import React, { useState, MouseEvent, CSSProperties, useRef } from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddCommentIcon from '@material-ui/icons/AddComment';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { ServerConnection } from '@jupyterlab/services';
import { URLExt } from '@jupyterlab/coreutils';
import { RequestHandler } from './request';
import { ConvertToJsonDag } from './createJsonDag';
import { ConvertConfToDesiredObj } from './createJsonDag';
import { ConfigureRuntime } from './configRuntime';
import { InputDialog, Dialog, showDialog } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
const useStyles = makeStyles({
  tools: {
    backgroundColor : '#8080805c',
    borderColor: 'darkgray',
    borderRight: 'groove'
  },
  toollast: {
    backgroundColor : '#8080805c',
    borderColor: 'darkgray'
  },
  toolicons : {
    paddingTop: '6px',
    paddingBottom: '6px'
  }
});
export const ToolBar = (props): JSX.Element => {
  const classes = useStyles();
  const [openRuntimeDrawer,setopenRuntimeDrawer] = useState(false);
  const [configRuntime, setconfigRuntime] = useState({
    AirflowEndpoint: "Apache Airflow UI Endpoint",
    AirflowNamespace: "default",
    GITEndpoint: "https://api.github.com",
    GITRepo: "GITHub DAG Repository",
    GITBranch: "main",
    GITToken: "",
    StorageEndpoint: "Cloud Object Storage Endpoint",
    StorageSecret: "Cloud Object Storage Credentials Secret",
    StorageUsername: "Cloud Object Storage Username",
    StoragePassword: "Cloud Object Storage Password",
    StorageBucket: "Cloud Object Storage Bucket"
  });
  const handleConfigPersist = (configItems) => {
    setconfigRuntime(configItems);
    setopenRuntimeDrawer(false);
  };
  const handleclick = (event, type) => {
    if (type == "Run") {
      //This method does the below actions
      /*
      a) Convert the Elements to json onDragStart

      */
      let payloadItems = {
        jsondag : ConvertToJsonDag(props.pipeline),
        configuration: ConvertConfToDesiredObj(props.parameters),
        github: {
          token : "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",
          repo : "krishnadhoundiyal/extensions-jupyter",
          branch: "test",
          url: "https://api.github.com"
        }
      };
      //ask user to overrides and execute the server application
      InputDialog.getText({ title: 'Override DAG Name - '+ payloadItems.jsondag.name }).then(value => {
         if (value.value != "" && value.button.label != 'Cancel') {
           payloadItems.jsondag.name = value.value
          }
          InputDialog.getText({ title: 'Override DAG Description - '+ payloadItems.jsondag.pipeline_description }).then(value => {
              if (value.value != ""  && value.button.label != 'Cancel') {
               payloadItems.jsondag.pipeline_description = value.value;
             }
              //trigger the server app now,
             let serverPromise = RequestHandler.makePostRequest( 'explorersdev/executeAirflow',
             JSON.stringify(payloadItems)).then(response =>{
               console.log(response);
               let body = document.createElement('div');
               body.innerHTML = "<p> DAG Succesfully Uploaded to the GIT Location \
                                <a style=\"text-decoration:underline;\" href=" + response.git_url + " target=\"_blank\">DAG URL</a><br/>\
		                            Updated Cloud Storage Bucket : " + response.object_storage_bucket + "<br/>\
                                Updated Cloud Storage Folder Created : " + response.object_storage_path + "<br/>\
                                Airflow Instance Triggered on : " + configRuntime['AirflowEndpoint'] + "</p>";

               showDialog({
                     title: 'Explorer Processing Engine',
                     body: new Widget({ node: body }),
                     buttons: [Dialog.cancelButton()]
                   }).then(result => {
                     console.log("Do Nothing");
                   });
            });
          });
        });

    }
    if (type == "Configure") {
      setopenRuntimeDrawer(true);
    }
  }
  return (
    <React.Fragment>
    <Grid item xs={2}></Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Attach"
      onClick={(event) => handleclick(event,"Run")}
      >
      <AttachFileIcon fontSize="small" />
    </IconButton>
    </Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Run">
      <ArrowRightIcon fontSize="small" />
    </IconButton>
    </Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Configure"
      onClick={(event) => handleclick(event,"Configure")}
      >
      <AssignmentTurnedInIcon fontSize="small" />

    </IconButton>
    {openRuntimeDrawer && (
    <ConfigureRuntime
      callback={handleConfigPersist}
      config={configRuntime}
    />
    )}
    </Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Save">
      <SettingsIcon fontSize="small" />
    </IconButton>
    </Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Save">
      <ClearAllIcon fontSize="small" />
    </IconButton>
    </Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Save">
      <ViewListIcon fontSize="small" />
    </IconButton>
    </Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Save">
      <GetAppIcon fontSize="small" />
    </IconButton>
    </Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Save">
      <AddCommentIcon fontSize="small" />
    </IconButton>
    </Grid>
    <Grid item xs={1} classes={{root:classes.toollast}}>
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Save">
      <FileCopyIcon fontSize="small" />
    </IconButton>
    </Grid>
    <Grid item xs={1} >

    </Grid>
    </React.Fragment>

  );
}
