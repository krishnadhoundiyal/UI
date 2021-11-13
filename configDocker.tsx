import React from "react";
import { useState , useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import { updateDockerConfig, getDockerConfig } from "./DockerImage";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
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
 solidline: {
   backgroundColor: "black"
 },
  iconMarginUnSet: {}
});
export const ConfigureDocker = (props) => {
  const [imageconf, setimageconf] = useState([]);
  useEffect(() => {
    let arrT = getDockerConfig();
    setimageconf(arrT);
  },[]);
  const saveUserInputs = (evt, type, index = -1) => {
    let temp_obj = [...imageconf];
    let conf_obj = { ...temp_obj[index] };
    conf_obj[type] = evt.target.value;
    temp_obj[index] = conf_obj;
    setimageconf(temp_obj);
  };
  const submit = (event, type) => {
    if (type === "Save") {
      updateDockerConfig(imageconf);
      props.callback();
    }
    if (type === "Image") {
      let arrVal = [...imageconf];
      let temp_P = {
        Name: "Image Name",
        Description: "Image Description",
        Policy: "",
        Secret: "Image Pull Secret"
      };
      arrVal.push(temp_P);
      setimageconf(arrVal);

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
               Docker Images Configuration
            </Typography>
          </Grid>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={11}>
            <Typography align="left" variant="h6">
              Learn About the fields on the [ Insert Link ]
            </Typography>
          </Grid>
          {imageconf.map((itx, idx) => {

            return (
              <React.Fragment key={`$idx + 910`.toString() + " docImgs"}>
                <Grid item={true} xs={1}></Grid>
                <Grid item={true} xs={5}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"

                    defaultValue={itx.Name}
                    variant="outlined"
                    classes={{ root: classes.configTextFields }}
                    onBlur={(e) => saveUserInputs(e, "Name", idx)}
                  />
                </Grid>

                <Grid item={true} xs={5}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Image Description"
                    variant="outlined"
                    defaultValue={itx.Description}
                    classes={{ root: classes.configTextFields }}
                    onBlur={(e) => saveUserInputs(e, "Description", idx)}
                  />
                </Grid>
                <Grid item={true} xs={1}></Grid>
                <Grid item={true} xs={1}></Grid>
                <Grid item={true} xs={5}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Image Pull Policy"
                    variant="outlined"
                    classes={{ root: classes.configTextFields }}
                    defaultValue={itx.Policy}
                    onBlur={(e) => saveUserInputs(e, "Policy", idx)}
                  />
                </Grid>

                <Grid item={true} xs={5}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Image Secret"
                    variant="outlined"
                    defaultValue={itx.secret}
                    classes={{ root: classes.configTextFields }}
                    onBlur={(e) => saveUserInputs(e, "Secret", idx)}
                  />
                </Grid>
                <Grid item={true} xs={1}></Grid>
                <Grid item={true} xs={1}></Grid>
                <Grid item={true} xs={10}>
                  <Divider classes={{ root: classes.solidline }} />
                </Grid>
                <Grid item={true} xs={1}></Grid>
              </React.Fragment>
            );
          })}
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={3}>
            <Button variant="outlined" onClick={(e) => submit(e, "Save")}>
              SAVE AND CLOSE
            </Button>
          </Grid>

          <Grid item={true} xs={3}>
            <Button variant="outlined" onClick={(e) => submit(e, "Image")}>
              ADD IMAGE DETAILS
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </React.Fragment>
  );
};
