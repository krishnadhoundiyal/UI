import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import React from "react";
import { IDocumentManager } from '@jupyterlab/docmanager';
import { SiJupyter } from 'react-icons/si';
import factoryVar  from './reflect';
const useStyles = makeStyles({
 errors : {
   backgroundColor : "#ff000094"
 },
 success : {
   backgroundColor : "#e06613"
 },
 textClick :{
   textDecoration: "underline",
   color : "#e67a46cc"
 }
});
export const ModalErrors = (props) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    props.callback()
  };
  const handleclick = (event,type,filename) => {
      props.callback()
    if (type == "filedownload") {
      const docManager = factoryVar["manager"];
      //let filePath = response.directory + "/" + response.file;
      docManager.open(filename);
    }
    setOpen(false);
  }
  const classes = useStyles();
  return (
    <React.Fragment>
  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       {"details" in props.errorobject && (
         <DialogTitle classes={{root:classes.success}} id="alert-dialog-title">{"Jupyter Processed Notebook Available"}</DialogTitle>
       )}
       {!("details" in props.errorobject) && (
         <DialogTitle classes={{root:classes.errors}} id="alert-dialog-title">{"Error from Server Application"}</DialogTitle>
       )}
        <DialogContent>
          <DialogContentText >
            {props.errorobject.error}
          </DialogContentText>
          <DialogContentText >
            {props.errorobject.traceback}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {!("details" in props.errorobject) && (
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        )}
        {"details" in props.errorobject && (
          <Button
              variant="contained"
              color="primary"
              onClick={(event) => handleclick(event,"filedownload",props.errorobject["details"])}

              startIcon={<SiJupyter />}
            >
        Open Processed Notebook
      </Button>
        )}
        </DialogActions>
      </Dialog>
</React.Fragment>
  )
}
