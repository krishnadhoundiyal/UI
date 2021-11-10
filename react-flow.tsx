import React, { useState, MouseEvent, CSSProperties, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import _ from 'lodash';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  isNode,
  Node,
  Elements,
  FlowElement,
  OnLoadParams,
  FlowTransform,
  SnapGrid,
  ArrowHeadType,
  Connection,
  Edge,
} from 'react-flow-renderer';
import PublishIcon from '@material-ui/icons/Publish';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PermanentDrawerLeft } from './s2';
import Avatar from '@material-ui/core/Avatar';
import { jupyterexplorericon } from './icon';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import { ContextMenu } from './contextmenu';
import { DrawerConfigure } from './configuredrawer';
import { ToolBar } from './toolbar';
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingOverlay from 'react-loading-overlay';
import RotateLoader from 'react-spinners/RotateLoader';
import { css } from "@emotion/react";
const initialElements: Elements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Add Rules' },
    position: { x: 250, y: 5 },
  },
];
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  progress: {
    marginTop: '250px',
    marginLeft: '150px'
  },
  root: {
    borderTop: 'inset',
    borderColor:"#7821498a",
    borderRadius:'0px'

  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
}));
let id = 0;
const getId = () => `dndnode_${id++}`;

export const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [nodeId, setNodeId] = useState(null);
  const [contextMenu,setContextMenu] = useState(false);
  const [openDrawer,setopenDrawer] = useState(false);
  const [conf, setconf] = useState({});
  const [objtoPass, setobjtoPass] = useState({});
  const [loading,setloading] = useState(false);
  const [dagDetails,setDagDetails] = useState({
    dag_id : '',
    dag_run_id : ''
  });
  const onNodeContextMenu = (event,node) => {
    event.preventDefault();
    setAnchorEl(event.target);
    setNodeId(node.id);
    setContextMenu(true);
  }
  const onOpenDrawer = () => {
    let objtoPass = {};
   if (nodeId in conf) {
     objtoPass = {
       id: conf[nodeId]["id"],
       label: conf[nodeId]["label"],
       type: conf[nodeId]["type"],
       FilePath: conf[nodeId]["jupyterFilePath"],
       DockerImage: conf[nodeId]["jupyterNotebookDockerImage"],
       Dependencies: conf[nodeId]["juputerNotebookDependency"],
       OutFiles: conf[nodeId]["jupyterNotebookOutFiles"],
       Environ: conf[nodeId]["jupyterNotebookEnvironVar"]
     };
   } else {
     objtoPass = {
       id: nodeId,
       label: "",
       type: "JupyterLabNotebook",
       FilePath: "",

       DockerImage: "None",
       Dependencies: [
         {
           fileSelected: ""
         }
       ],
       OutFiles: [
         {
           outfiles: ""
         }
       ],
       Environ: [
         {
           EnvironKey: "",
           EnvironValue: ""
         }
       ]
     };
   }
   setobjtoPass(objtoPass);
   setContextMenu(false);
   setopenDrawer(true);
  }
  const closeDrawer = (confObject, idx) => {
    let tObj = { ...conf };
    tObj[idx] = {
      id: idx,
      label: confObject["label"],
      type: confObject["type"],
      jupyterFilePath: confObject["FilePath"],
      jupyterNotebookDockerImage: confObject["DockerImage"],
      juputerNotebookDependency: confObject["Dependencies"],
      jupyterNotebookOutFiles: confObject["OutFiles"],
      jupyterNotebookEnvironVar: confObject["Environ"]
    };
    setconf(tObj);
    //Change the name of the item here --
    let temp_obj = elements.map((sItems,sIndex) => {
      let tempObj = {...sItems};
      if (tempObj["id"] == idx) {
        tempObj = _.cloneDeep(sItems);
        tempObj.data.label.props.children[1].props.children = confObject["label"];
      }
      return tempObj
    });
    setElements(temp_obj);
    setopenDrawer(false);
  };
  const updateDAGInfo = (data) => {
    let temp_obj = {
      dag_id : data["dag_id"],
      dag_run_id : data["dag_run_id"]
    }
    setDagDetails(temp_obj);
  }
  const updateAirflowStatus = (data) => {
    console.log(elements);
    let temp_obj = elements.map((sItems,sIndex) => {
      if ("source" in sItems && "target" in sItems) {
        //connection object Description
        let tempObj = {...sItems};
        tempObj["animated"] =  true;
        /*tempObj["animated"] =  true;
        tempObj['label'] = 'Failed';
        tempObj['style'] =  { stroke: 'red' };
        return tempObj;*/
        if (data[sItems["target"]] === "queued" || data[sItems["target"]] === undefined) {
          tempObj['label'] = 'Queued';
          tempObj['style'] =  { stroke: 'gray' };
        }
        if (data[sItems["target"]] === "running") {
          tempObj['label'] = 'Running';
          tempObj['style'] =  { stroke: 'green' };
        }
        if (data[sItems["target"]] === "success") {
          tempObj['label'] = 'Completed';
          tempObj['style'] =  { stroke: 'blue' };
        }
        if (data[sItems["target"]] === "upstream_failed") {
          tempObj['label'] = 'UpStream-Failed';
          tempObj['style'] =  { stroke: 'orange' };
        }
        if (data[sItems["target"]]["state"] === "failed") {
          tempObj['label'] = 'Failed';
          tempObj['style'] =  { stroke: 'red' };
        }
        if (data[sItems["target"]]["state"] === "skipped") {
          tempObj['label'] = 'Skipped';
          tempObj['style'] =  { stroke: 'pink' };
        }

        return tempObj;
      } else {
        return sItems;
      }
    });
    //Update UI
    setElements(temp_obj);
  }
  const onRemoveContextMenu = () => {
    setAnchorEl(null);
    setContextMenu(false);
  }
  const onConnect = (params) => {
    console.log(elements);
    if (params.source.includes("Comment") || params.target.includes("Comment")) {
      params.type = 'smoothstep';
      params.animated = true;
    }
    setElements((els) => addEdge(params, els));
  }
  const onTaskLogRecieve = (data) => {
    setContextMenu(false);
  }
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const classes = useStyles();
  const buttonClick = (event, pp) => {
      //setCondition([...condition, "ColumnA > 10"]);
      //setdrawerVisible(true);
      console.log(pp);
      event.preventDefault();
      event.stopPropagation();
    }
  const onLoad = (_reactFlowInstance) =>
    setReactFlowInstance(_reactFlowInstance);
  const onDragOver = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    };
  const getNewNode = (nodetype) => {
    if (nodetype === "JupyterLabNotebook") {
    return (

      <Box display="flex" flexDirection="row">
      <Box p={1}>
          <div className="jp-notebook-explorer"> </div>
        </Box>
        <Box p={1}>

      JupyterLab Notebook

          </Box>
      </Box>

    )
  } else if (nodetype === "Comment") {
    return (

      <TextareaAutosize
      maxRows={4}
      aria-label="Comment"
      placeholder="Maximum 4 rows"
      defaultValue="Add Comment Here."
    />
    )
  } else if (nodetype === "PythonScript") {
    return (

      <Box display="flex" flexDirection="row">
      <Box p={1}>
          <div className="jp-pyscript-explorer"> </div>
        </Box>
        <Box p={1}>

      Python Script

          </Box>
      </Box>

    )
  }
}

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: uuidv4().toString().replace(/\-/gi,""),
      type:type != "Comment" ? 'default' : 'output',
      position,
      data: { label : getNewNode(type)
    }
  };


    setElements((es) => es.concat(newNode));
  };
 const showloading = (data) => {
   setloading(data);
 }
 const overrideSpinner = css`
 position: fixed;
 margin-left: -80px;
 margin-top: -450px;
`;
  return (
    <LoadingOverlay
      active={loading}
      spinner={<RotateLoader color={"rgb(215, 105, 54)"} css= {overrideSpinner} />}
    >
    <div className="dndflow" style={{height:"1200px"}}>

      <ReactFlowProvider>
      <Grid container style={{marginTop:"2px"}}>
      <ToolBar pipeline={elements}
      parameters={conf}
      updateConnections={updateAirflowStatus}
      updateDagDetails={updateDAGInfo}
      showLoading={showloading}
      />


      <Grid item xs={3}>
        <PermanentDrawerLeft helpText="some" refresh={false} />
      </Grid>

      <Grid item xs={9}>

        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeContextMenu={onNodeContextMenu}
          >
            <Controls />
          </ReactFlow>
        </div>
        {contextMenu && (
          <ContextMenu anchorelement={anchorEl}
           nodeid={nodeId}
           dag_info={dagDetails}
           removeelementcallback={onRemoveContextMenu}
           handleLogItems={onTaskLogRecieve}
           handleDrawerOpen={onOpenDrawer} />
        )}
        {openDrawer && (
        <DrawerConfigure
          callback={closeDrawer}
          nodeId={nodeId}
          nodeobj={objtoPass}

        />
      )}

        </Grid>


        </Grid>
      </ReactFlowProvider>

    </div>
    </LoadingOverlay>

  );
};
