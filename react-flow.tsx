import React, { useState, MouseEvent, CSSProperties, useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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
    setopenDrawer(false);
  };
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
      id: getId() + type,
      type:type != "Comment" ? 'default' : 'output',
      position,
      data: { label : getNewNode(type)
    }
  };


    setElements((es) => es.concat(newNode));
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
      <Grid container style={{marginTop:"2px"}}>
      <ToolBar nodeId={nodeId} />


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
          <ContextMenu anchorelement={anchorEl} nodeid={nodeId} removeelementcallback={onRemoveContextMenu} handleDrawerOpen={onOpenDrawer} />
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
  );
};
