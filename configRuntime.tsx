import React from "react";
import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  drawer: {
    left: "290px",
    right: "40px" ,
    marginTop: "60px",
    bottom: "10px"

  },
  fullList: {
    width: "auto"
  },
  textfield: {
    height: "39px",
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "0px"
  },
  buttonbrowse: {
    borderRadius: "0px",
    height: "38px",
    backgroundColor: "#6c6d72f7"
  },
  dockerdropdown: {
    marginLeft: "10px"
  },
  addremovebutton: {
    padding: "3px"
  },
  iconMarginSet: {
    marginTop: "15px"
  },
  configTextFields: {
   width: "100%"
 },
  iconMarginUnSet: {}
});
export const ConfigureRuntime = (props) => {
  const [config, setconfig] = useState(props.config);
  const saveUserInputs = (evt, type, index = -1) => {
    let temp_obj = { ...config };
    temp_obj[type] = evt.target.value;
    setconfig(temp_obj);
  };
  const submit = (event, type) => {
    if (type === "Save") {
      props.callback(config);
    }
  };


  const classes = useStyles();
  return (
    <React.Fragment>
      <Drawer anchor="top" open={true} classes={{ paperAnchorTop: classes.drawer }}>
        <Grid container spacing={3}>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={11}>
            <Typography align="left" variant="h5">
              Add New Apache Airflow Runtime Configuration
            </Typography>
          </Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={11}>
            <Typography align="left" variant="h6">
              Learn About the fields on the [ Insert Link ]
            </Typography>
          </Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="Apache Airflow UI Endpoint"
              defaultValue={config.AirflowEndpoint}
              variant="outlined"
              classes={{ root: classes.configTextFields }}
              onBlur={(e) => saveUserInputs(e, "AirflowEndpoint")}
            />
          </Grid>

          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="Apache Airflow User Namespace"
              variant="outlined"
              defaultValue={config.AirflowNamespace}
              classes={{ root: classes.configTextFields }}
              onBlur={(e) => saveUserInputs(e, "AirflowNamespace")}
            />
          </Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="Apache Airflow UserName"
              defaultValue={config.AirflowUserName}
              variant="outlined"
              classes={{ root: classes.configTextFields }}
              onBlur={(e) => saveUserInputs(e, "AirflowUserName")}
            />
          </Grid>

          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="Apache Airflow Password"
              variant="outlined"
              defaultValue={config.AirflowPassword}
              classes={{ root: classes.configTextFields }}
              onBlur={(e) => saveUserInputs(e, "AirflowPassword")}
            />
          </Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="GITHub API Endpoint"
              variant="outlined"
              classes={{ root: classes.configTextFields }}
              defaultValue={config.GITEndpoint}
              onBlur={(e) => saveUserInputs(e, "GITEndpoint")}
            />
          </Grid>

          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="GITHub Repository"
              variant="outlined"
              defaultValue={config.GITRepo}
              classes={{ root: classes.configTextFields }}
              onBlur={(e) => saveUserInputs(e, "GITRepo")}
            />
          </Grid>
          <Grid item={true} xs={1}></Grid>

          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="GITHub DAG Branch"
              variant="outlined"
              defaultValue={config.GITBranch}
              classes={{ root: classes.configTextFields }}
              onBlur={(e) => saveUserInputs(e, "GITBranch")}
            />
          </Grid>

          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="GitHUB Access Token"
              variant="outlined"
              defaultValue={config.GITToken}
              classes={{ root: classes.configTextFields }}
              onBlur={(e) => saveUserInputs(e, "GITToken")}
            />
          </Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={11}>
            <Typography align="left" variant="h5">
              Cloud Object Storage
            </Typography>
          </Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="Cloud Object Storage Endpoint"
              variant="outlined"
              defaultValue={config.StorageEndpoint}
              classes={{ root: classes.configTextFields }}
              onBlur={(e) => saveUserInputs(e, "StorageEndpoint")}
            />
          </Grid>

          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="Cloud Object Storage Credentials Secret"
              variant="outlined"
              defaultValue={config.StorageSecret}
              classes={{ root: classes.configTextFields }}
              onBlur={(e) => saveUserInputs(e, "StorageSecret")}
            />
          </Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="Cloud Object Storage Username"
              variant="outlined"
              defaultValue={config.StorageUsername}
              classes={{ root: classes.configTextFields }}
              onBlur={(e) => saveUserInputs(e, "StorageUsername")}
            />
          </Grid>

          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="Cloud Object Storage Password"
              variant="outlined"
              classes={{ root: classes.configTextFields }}
              defaultValue={config.StoragePassword}
              onBlur={(e) => saveUserInputs(e, "StoragePassword")}
            />
          </Grid>
          <Grid item={true} xs={1}></Grid>

          <Grid item={true} xs={1}></Grid>

          <Grid item={true} xs={5}>
            <TextField
              required
              id="outlined-required"
              label="Cloud Object Storage Bucket Name"
              variant="outlined"
              classes={{ root: classes.configTextFields }}
              defaultValue={config.StorageBucket}
              onBlur={(e) => saveUserInputs(e, "StorageBucket")}
            />
          </Grid>
          <Grid item={true} xs={6}></Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={3}>
          <Button variant="outlined" onClick={(e) => submit(e, "Save")}>
            SAVE AND CLOSE
          </Button>
          </Grid>
        </Grid>
      </Drawer>
    </React.Fragment>
  );
};
