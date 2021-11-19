import AttachFileIcon from '@material-ui/icons/AttachFile';
import Grid from '@material-ui/core/Grid';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { AiFillGithub } from 'react-icons/ai';
import { SiKubernetes, SiApacheairflow, SiDocker } from 'react-icons/si';
import {BiSelection} from 'react-icons/bi';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
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
import { ConfigureDocker } from './configDocker';
import { ModalErrors } from './modal';
import { InputDialog, Dialog, showDialog } from '@jupyterlab/apputils';
import { updateAirflowConfig } from './airflowConfig';
import { Widget } from '@lumino/widgets';
import Tooltip from '@material-ui/core/Tooltip';
import { Rnd } from "react-rnd";
import { v4 as uuidv4 } from 'uuid';
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
  },
  progress: {
    marginTop: '200px'
  },
  iconalign :{
    float:"right"
},
});
export const ToolBar = (props): JSX.Element => {
  const classes = useStyles();
  const [openRuntimeDrawer,setopenRuntimeDrawer] = useState(false);
  const [openDockerDrawer,setopenDockerDrawer] = useState(false);
  const [openErrorDialog,setopenErrorDialog] = useState(false);
  const [statusfunreference,setstatusfunreference] = useState(0);
  const [dagid,setdagid] = useState("");
  const [openGrouper,setopenGrouper] = useState(false);
  const [position,setposition] = useState({
    x : 10,
    y : 10,
    width:"80px",
    height: "80px"
  });
  const handleGroupDrag = (event,d) => {
    let tempPosition = {...position}
    tempPosition["x"] = d.x;
    tempPosition["y"] = d.y;
    setposition(tempPosition);
  }
  const handleGroupResize = (e, direction, ref, delta, pos) => {
    let tempPosition = {...position}
    tempPosition["width"] = ref.style.width;
    tempPosition["height"] =ref.style.height;
    setposition(tempPosition);
  }
  const [errorDetails,seterrorDetails] = useState({
    'error' : '',
    'traceback': ''
  });
  const resetErrorDetails = () => {
    let temp_obj = {
      'error' : '',
      'traceback': ''
    }
    seterrorDetails(temp_obj);
    setopenErrorDialog(false);
  }
  const [configRuntime, setconfigRuntime] = useState({
    AirflowEndpoint: "Apache Airflow UI Endpoint",
    AirflowNamespace: "default",
    AirflowUserName: "admin",
    AirflowPassword: "admin",
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
    updateAirflowConfig(configItems);
    setopenRuntimeDrawer(false);
  };
  const handleDockerPersist = (configItems) => {

    setopenDockerDrawer(false);
  };
  const handleGroup = (evt,type) => {
    if (type == "Close") {
      setposition({
        x : 10,
        y : 10,
        width:"80px",
        height: "80px"
      });
      setopenGrouper(false);
    }
    if (type == "Group") {
      console.log("#############")
      console.log(props);
      let x_rect_top = position["x"] + 245;
      let y_rect_top = position["y"] + (-28);
      let x_max = x_rect_top + Number(position["width"].replace(/px$/, ''));
      let y_max = y_rect_top + Number(position["height"].replace(/px$/, ''));
      let containedNodes = props.pipeline.filter((item,index) => {
        if ("position" in item) {
          if (item["position"]["x"] > x_rect_top && item["position"]["x"] < x_max &&
          item["position"]["y"] > y_rect_top && item["position"]["y"] < y_max) {
                return true;
              } else {
                return false;
              }
        } else {
          return false;
        }
      });
      console.log(containedNodes);
      //Find nodes which feed inputs and are residing outside. This would mean nodes except containerNodes
      let containerNodesID = containedNodes.map((items,idx) => {
        return items["id"];
      })
      let outsideInputNodes = props.pipeline.reduce((previousValue,currentValue,currentIndex,arr) => {
        if("target" in currentValue){
          if (containerNodesID.indexOf(currentValue["target"]) > -1 && containerNodesID.indexOf(currentValue["source"]) == -1) {
            previousValue.push(currentValue["source"]);
          }

        }
        return previousValue;
      },[]).filter((value, index, array)=>{
        if (array.indexOf(value) == index){
          return true;
        } else {
          return false;
        }
      });
      let outsideOutputNodes = props.pipeline.reduce((previousValue,currentValue,currentIndex,arr) => {
        if("source" in currentValue){
          if (containerNodesID.indexOf(currentValue["source"]) > -1 &&  containerNodesID.indexOf(currentValue["target"]) == -1) {
            previousValue.push(currentValue["target"]);
          }
        }
        return previousValue;
      },[]).filter((value, index, array)=>{
        if (array.indexOf(value) == index){
          return true;
        } else {
          return false;
        }
      });
      let itemsToHide = props.pipeline.reduce((previousValue,currentValue,currentIndex,arr) => {
        if ("source" in currentValue) {
          if (containerNodesID.indexOf(currentValue["source"]) > -1 || containerNodesID.indexOf(currentValue["target"]) > -1 ) {
            previousValue.push(currentValue["id"]);
          }
        } else {
          if (containerNodesID.indexOf(currentValue["id"]) > -1) {
            previousValue.push(currentValue["id"]);
          }
        }
        return previousValue;
      },[]);
      let newNode = {
                id: uuidv4().toString().replace(/\-/gi,""),
                type:'default',
                position: { x: x_rect_top + ((x_max-x_rect_top)/2), y: y_rect_top + ((y_max-y_rect_top)/2) },
                data: { label : "GroupItem-" + uuidv4().toString().replace(/\-/gi,"") }
              };
     let inboundConnections = outsideInputNodes.map((itx,idx) => {
       return {
         id: uuidv4().toString().replace(/\-/gi,""),
         source: itx,
         target: newNode["id"]
       };

     });
     let outboundConnections = outsideOutputNodes.map((itx,idx) => {
       return {
         id: uuidv4().toString().replace(/\-/gi,""),
         target: itx,
         source: newNode["id"]
       };

     });
     let result_val = {
       "node" : newNode,
       "inputConnections" : inboundConnections,
       "outputConnections": outboundConnections,
       "itemsToHide" : itemsToHide
     };
     props.groupItems(result_val);

    }
  }
  const handleclick = (event, type) => {
    if (type == "Run") {
      //This method does the below actions
      /*
      a) Convert the Elements to json onDragStart

      */
      let payloadItems = {
        jsondag : ConvertToJsonDag(props.pipeline),
        configuration: ConvertConfToDesiredObj(props.parameters),
        /*github: {
          token : "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",
          repo : "krishnadhoundiyal/extensions-jupyter",
          branch: "test",
          url: "https://api.github.com"
        }
        */
      };
      payloadItems["github"] = {
        "token": configRuntime["GITToken"],
        "repo": configRuntime["GITRepo"],
        "branch": configRuntime["GITBranch"],
        "url" : configRuntime["GITEndpoint"]
      }
      payloadItems["cos-config"] = {
        "cos_endpoint": configRuntime["StorageEndpoint"],
         "cos_username": configRuntime["StorageUsername"],
         "cos_password": configRuntime["StoragePassword"],
         "cos_bucket": configRuntime["StorageBucket"],
         "user_params" : {
             "name" : ""
         }
      }
      setdagid(payloadItems.jsondag["name"]);
      //ask user to overrides and execute the server application
      InputDialog.getText({ title: 'Override DAG Name - '+ payloadItems.jsondag.name }).then(value => {
        payloadItems["cos-config"]["user_params"]["name"] = payloadItems.jsondag.name;
         if (value.value != "" && value.button.label != 'Cancel') {
           payloadItems.jsondag.name = value.value
          }
          InputDialog.getText({ title: 'Override DAG Description - '+ payloadItems.jsondag.pipeline_description }).then(value => {
              if (value.value != ""  && value.button.label != 'Cancel') {
               payloadItems.jsondag.pipeline_description = value.value;
             }
              //trigger the server app now,
             setdagid(payloadItems.jsondag["name"]);
             payloadItems["cos-config"]["user_params"]["name"] = payloadItems.jsondag.name;
             props.showLoading(true);
             let serverPromise = RequestHandler.makePostRequest( 'explorersdev/executeAirflow',
             JSON.stringify(payloadItems)).then(response =>{
               console.log(response);
               props.showLoading(false);
               let body = document.createElement('div');
               body.innerHTML = "<AiFillGithub  fontSize='small' /><p> DAG Succesfully Uploaded to the GIT Location \
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
            }, reject => {
              props.showLoading(false);
              console.log(reject);
              let temp_obj = {
                'error' : reject.message,
                'traceback': reject.traceback
              }
              seterrorDetails(temp_obj);
              setopenErrorDialog(true);
              /*
              let body = document.createElement('div');
              body.innerHTML = "<h3>Error in Processing DAG and dependencies\
                                <p> " + reject.message + " </p> \
                                <p>" + reject.traceback + "</p> \
                                <p>" + reject.timestamp + "</p> \
                                </h3>";

              showDialog({
                    title: 'Error Details',
                    body: new Widget({ node: body }),
                    buttons: [Dialog.cancelButton()]
                  }).then(result => {
                    console.log("Do Nothing");
                  });
                  */
            });

          });
        });

    }
    if (type == "Configure") {
      let payloadItems = {
        airflow_ip : configRuntime["AirflowEndpoint"],
        airflow_port: "30507",
        airflow_uname: configRuntime["AirflowUserName"],
        airflow_pass: configRuntime["AirflowPassword"],
        dag_id : dagid
      };

              //trigger the server app now,
         let serverPromise = RequestHandler.makePostRequest( 'explorersdev/triggerAirflow',
         JSON.stringify(payloadItems)).then(response =>{
           console.log(response);
           let body = document.createElement('div');
           body.innerHTML = "<p> Triggered Airflow DAG successfully \
                            Airflow DAG ID : "  + response.data.dag_id + "<br/>\
                            Airflow DAG Run ID : " + response.data.dag_run_id + "<br/>\
                            Execution Data : " + response.data.execution_date + "<br/>\
                            State : " + response.data.state + "</p>";

           showDialog({
                 title: 'Trigger Airflow',
                 body: new Widget({ node: body }),
                 buttons: [Dialog.cancelButton()]
               }).then(result => {
                 console.log("Do Nothing");
               });
               props.updateDagDetails({
                 dag_id : response.data.dag_id,
                 dag_run_id :  response.data.dag_run_id
               });
          // Query the Airflow to get the status of the tasks
          let queryStatuePayload = {
            airflow_ip : configRuntime["AirflowEndpoint"],
            airflow_port: "30507",
            airflow_uname: configRuntime["AirflowUserName"],
            airflow_pass: configRuntime["AirflowPassword"],
            dag_id : response.data.dag_id,
            dag_run_id :  response.data.dag_run_id
          };
          var funRef = setInterval(() => {
            let dagStatusRequest = RequestHandler.makePostRequest( 'explorersdev/getDAGStatus',
            JSON.stringify(queryStatuePayload)).then(dagStatus =>{
              if (["failed","success","completed","notfound"].includes(dagStatus["state"])) {
                //clearInterval(funRef);
                // I cant stop the polling here, as it will not fetch the last tasks status, so will tell it to stop after 50 secs
                setTimeout(() => {
                  clearInterval(funRef);
                }, 18000);
              }
                // Get the task status
                let stop_ajax = false;
                let statusPromise = RequestHandler.makePostRequest( 'explorersdev/getTaskStatus',
                JSON.stringify(queryStatuePayload)).then(taskstatus =>{
                  let statusMap = taskstatus["data"].reduce ((previousValue,currentValue,currentIndex,arr) => {
                  previousValue[currentValue["task_id"]] = currentValue["state"];
                  if (["failed","upstream_failed"].includes(currentValue['state'])) {
                    stop_ajax = true;
                  }
                  return previousValue;
                },{});
                  if (stop_ajax) {
                    //clearInterval(funRef);
                  }
                  props.updateConnections(statusMap);
                });


            },reject => {
              //stop the polling here
              clearInterval(funRef);
            });

          },6000);



        }, reject => {
          console.log(reject);
          let temp_obj = {
            'error' : reject.message,
            'traceback': reject.traceback
          }
          seterrorDetails(temp_obj);
          setopenErrorDialog(true);
        });



    }
    if (type == "AirflowConfig") {
      setopenRuntimeDrawer(true);
    }
    if (type == "DockerImage") {
      setopenDockerDrawer(true);
    }
    if (type == "GroupTasks") {
      setopenGrouper(true);
    }
  }
  return (
    <React.Fragment>
    <Grid item xs={2}></Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <Tooltip title="Generate DAG and Dependencies">
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Attach"
      onClick={(event) => handleclick(event,"Run")}
      >
      <AiFillGithub  size={20} />
    </IconButton>
    </Tooltip>
    </Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
      <Tooltip title="Add Your Docker Images to control environments">
    <IconButton classes={{root:classes.toolicons}}
    aria-label="Attach"
    onClick={(event) => handleclick(event,"DockerImage")}
    >

      <SiDocker size = {20} />
    </IconButton>
      </Tooltip>
    {openDockerDrawer && (
    <ConfigureDocker
      callback={handleDockerPersist}

    />
    )}

    </Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <Tooltip title="Execute Pipeline on Kubernetes Cluster">
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Configure"
      onClick={(event) => handleclick(event,"Configure")}
      >
        <SiKubernetes  size={20} />

    </IconButton>
    </Tooltip>
    </Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <Tooltip title="Runtime Configurations">
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Save"
      onClick={(event) => handleclick(event,"AirflowConfig")}
      >
      <SiApacheairflow size={20} />
    </IconButton>
    </Tooltip>
    {openRuntimeDrawer && (
    <ConfigureRuntime
      callback={handleConfigPersist}
      config={configRuntime}
    />
    )}
    </Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <Tooltip title="Group Tasks">
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Save"
      onClick={(event) => handleclick(event,"GroupTasks")}
      >
      <BiSelection size={20} />
    </IconButton>
    </Tooltip>
    {openGrouper && (
      <Rnd
    style={{"background":"#b1aaaa1f","border":"dashed","zIndex":12121211}}
    size={{ width: position["width"],  height: position["height"] }}
    position={{ x: position["x"], y: position["y"] }}
    onDragStop={(e, d) => handleGroupDrag(e,d)}
    onResize={(e, direction, ref, delta, position) => handleGroupResize(e,direction,ref,delta,position)}
  >
  <IconButton aria-label="check" size="small" color="primary" classes={{root:classes.iconalign}}>
  <CheckIcon fontSize="inherit"
 onClick={(e) => handleGroup(e,"Group")}
   />
</IconButton>
<IconButton aria-label="delete" size="small" color="secondary" classes={{root:classes.iconalign}}>
  <BlockIcon fontSize="inherit"
  onClick={(e) => handleGroup(e,"Close")}
   />
</IconButton>
  </Rnd>
    )}

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
    {openErrorDialog && (
        <ModalErrors
          errorobject={errorDetails}
          callback={resetErrorDetails}
        />
      )}

    </React.Fragment>

  );
}
