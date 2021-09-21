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
  return (
    <React.Fragment>
    <Grid item xs={2}></Grid>
    <Grid item xs={1} classes={{root:classes.tools}}>
    <IconButton classes={{root:classes.toolicons}}
      aria-label="Attach">
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
      aria-label="Save">
      <AssignmentTurnedInIcon fontSize="small" />
    </IconButton>
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
