import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import React from "react";
const useStyles = makeStyles({
 errors : {
   backgroundColor : "#ff000094"
 }
});
export const ModalErrors = (props) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    props.callback()
  };
  const classes = useStyles();
  return (
    <React.Fragment>
  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle classes={{root:classes.errors}} id="alert-dialog-title">{"Error from Server Application"}</DialogTitle>
        <DialogContent>
          <DialogContentText >
            {props.errorobject.error}
          </DialogContentText>
          <DialogContentText >
            {props.errorobject.traceback}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

        </DialogActions>
      </Dialog>
</React.Fragment>
  )
}
