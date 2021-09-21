import React from "react";
import { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Typography from "@material-ui/core/Typography";
import { IDocumentManager } from '@jupyterlab/docmanager';
import { FileDialog, IFileBrowserFactory } from '@jupyterlab/filebrowser';
import factoryVar  from './reflect';

const useStyles = makeStyles({
  drawer: {
    width: "500px !important"
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
  iconMarginUnSet: {}
});
export const DrawerConfigure = (props) => {
  const [node, setnode] = useState(props.node);
  const [jupyterrule, setjupyterlabrule] = useState(
    "Custome Label for Notebook"
  );
  const [dockerImage, setdockerImage] = useState(props.nodeobj.DockerImage);
  const [environ, setenviron] = useState(props.nodeobj.Environ);
  const [filedepencies, setfiledepencies] = useState(
    props.nodeobj.Dependencies
  );
  const [outfile, setoutfile] = useState(props.nodeobj.OutFiles);
  const [notebookpath, setnotebookpath] = useState(props.nodeobj.FilePath);
  const saveUserInputs = (evt, type, index = -1) => {
    if (type === "NotebookLabel") {
      setjupyterlabrule(evt.target.value);
    }
    if (type === "NotebookSelected") {
      setnotebookpath(evt.target.value);
    }
    if (type === "DockerImage") {
      setdockerImage(evt.target.value);
    }
    if (type === "EnvironValue" || type === "EnvironKey") {
      let tObj = [...environ];
      tObj[index][type] = evt.target.value;
      setenviron(tObj);
    }
    if (type === "Dependency") {
      let tObj = [...filedepencies];
      tObj[index]["fileSelected"] = evt.target.value;
      setfiledepencies(tObj);
    }
    if (type === "OutputFiles") {
      let tObj = [...outfile];
      tObj[index]["outfiles"] = evt.target.value;
      setoutfile(tObj);
    }
  };
  const addEnvRow = (evt, index, type) => {
    if (type === "Environ") {
      let tObj = {
        EnvironKey: "",
        EnvironValue: ""
      };
      let cloneObj = [...environ];
      cloneObj.splice(index + 1, 0, tObj);
      setenviron(cloneObj);
    }
    if (type === "Dependency") {
      let tObj = {
        fileSelected: ""
      };
      let cloneObj = [...filedepencies];
      cloneObj.splice(index + 1, 0, tObj);
      setfiledepencies(cloneObj);
    }
    if (type === "OutputFiles") {
      let tObj = {
        outfiles: ""
      };
      let cloneObj = [...outfile];
      cloneObj.splice(index + 1, 0, tObj);
      setoutfile(cloneObj);
    }
  };
  const removeRow = (evt, index, type) => {
    if (type === "Environ") {
      let tObj = [...environ];
      tObj.splice(index, 1);
      setenviron(tObj);
    }
    if (type === "Dependency") {
      let tObj = [...filedepencies];
      tObj.splice(index, 1);
      setfiledepencies(tObj);
    }
    if (type === "OutputFiles") {
      let tObj = [...outfile];
      tObj.splice(index, 1);
      setoutfile(tObj);
    }
  };
  const saveandclose = (event, type) => {
    if (type === "Save") {
      let tObj = {
        id: props.nodeId,
        label: jupyterrule,
        type: "JupyterLabNotebook",
        FilePath: notebookpath,

        DockerImage: dockerImage,
        Dependencies: filedepencies,
        OutFiles: outfile,
        Environ: environ
      };
      props.callback(tObj, props.nodeId);
    }
    if (type === "Close") {
      //const factory:IFileBrowserFactory = factoryVar["factory"]




    }
  };
    const handlefileOpen = async (event,type, index = -1) => {
      const docManager = factoryVar["manager"];
      const dialog = FileDialog.getOpenFiles({
            manager : docManager // IDocumentManager
      });
      const result = await dialog;

      if(result.button.accept){
        let files = result.value;
        if (type === "NotebookSelected") {
          setnotebookpath("/" + files[0].path);
        }
        if (type === "Dependencies") {
          let tObj = [...filedepencies];
          tObj[index]["fileSelected"] = "/" + files[0].path;
          setfiledepencies(tObj);
        }

      }

    }

  const classes = useStyles();
  return (
    <React.Fragment>
      <Drawer anchor="right" open={true} classes={{ paper: classes.drawer }}>
        <Grid container spacing={3}>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={10}>
            <TextField
              id="filled-full-width"
              style={{ margin: 8 }}
              onChange={(e) => saveUserInputs(e, "NotebookLabel")}
              placeholder="Custom Label for Notebook"
              helperText="Jupiter Notebook"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                classes: {
                  root: classes.textfield
                }
              }}
              variant="filled"
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={3} style={{ marginTop: "5px" }}>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={7}>
            <TextField
              id="filled-full-width"
              style={{ margin: 8 }}
              placeholder="Filename"
              helperText="FilePath to the Notebook"
              fullWidth
              margin="normal"
              value={notebookpath}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                classes: {
                  root: classes.textfield
                }
              }}
              variant="filled"
            />
          </Grid>
          <Grid
            item={true}
            xs={2}
            style={{ marginTop: "8px", marginLeft: "-3px", paddingLeft: "0px" }}
          >
            <Button
              variant="contained"
              component="label"
              classes={{ root: classes.buttonbrowse }}
              onClick={(event) => handlefileOpen(event, "NotebookSelected")}
            >
              Browse

            </Button>
          </Grid>
        </Grid>
        <Divider />
        <Grid container style={{ marginTop: "20px" }}>
          <Grid item={true} xs={1}></Grid>
          <Grid item={true} xs={10}>
            <FormControl className={classes.dockerdropdown}>
              <InputLabel htmlFor="age-native-helper">Runtime Image</InputLabel>
              <NativeSelect
                value={dockerImage}
                onChange={(e) => saveUserInputs(e, "DockerImage")}
                inputProps={{
                  name: "age",
                  id: "age-native-helper"
                }}
              >
                <option key="34" aria-label="None" value="None" />
                <option key="44" value="Pandas">
                  Pandas
                </option>
                <option key="55" value="PyTorch">
                  PyTorch
                </option>
                <option key="66" value="TensorFlow">
                  TensorFlow
                </option>
              </NativeSelect>
              <FormHelperText>
                Docker Images used as Execution Environment{" "}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Divider />
        {environ.map((env, index) => {
          return (
            <React.Fragment key={`$index`.toString() + " ENV"}>
              <Grid container spacing={3} style={{ marginTop: "5px" }}>
                <Grid item={true} xs={1}></Grid>
                <Grid item={true} xs={4} style={{ marginLeft: "5px" }}>
                  <TextField
                    id="filled-full-width"
                    style={{ margin: 8 }}
                    placeholder="Key"
                    helperText="Environment Variable"
                    onChange={(e) => saveUserInputs(e, "EnvironKey", index)}
                    fullWidth
                    value={env["EnvironKey"]}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textfield
                      }
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item={true} xs={1}></Grid>
                <Grid item={true} xs={4}>
                  <TextField
                    id="filled-full-width"
                    style={{ margin: 8 }}
                    placeholder="Value"
                    helperText="Environment Variable"
                    fullWidth
                    onChange={(e) => saveUserInputs(e, "EnvironValue", index)}
                    value={env["EnvironValue"]}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textfield
                      }
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item={true} xs={1}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                  >
                    <Grid item={true}>
                      <IconButton
                        aria-label="Add"
                        onClick={(event) => addEnvRow(event, index, "Environ")}
                        classes={{
                          root: `${classes.addremovebutton} ${
                            index < 1
                              ? classes.iconMarginSet
                              : classes.iconMarginUnSet
                          }`
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                    {index > 0 && (
                      <Grid item={true}>
                        <IconButton
                          aria-label="delete"
                          classes={{ root: classes.addremovebutton }}
                          onClick={(event) =>
                            removeRow(event, index, "Environ")
                          }
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
        <Divider />
        {filedepencies.map((file, index) => {
          return (
            <React.Fragment key={`$index`.toString() + " FILES"}>
              <Grid container style={{ marginTop: "1px" }}>
                <Grid item={true} xs={1}></Grid>
                <Grid item={true} xs={7}>
                  <TextField
                    id="filled-full-width"
                    style={{ margin: 8 }}
                    placeholder="File Dependencies"
                    helperText="FilePath to the dependent file"
                    fullWidth
                    value={file["fileSelected"]}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textfield
                      }
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid
                  item={true}
                  xs={2}
                  style={{ marginTop: "8px", paddingLeft: "8px" }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    classes={{ root: classes.buttonbrowse }}
                    onClick={(event) => handlefileOpen(event, "Dependencies",index)}
                  >

                    Add
                  </Button>
                </Grid>
                <Grid item={true} xs={2} style={{}}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item={true}>
                      <IconButton
                        aria-label="Add"
                        classes={{
                          root: `${classes.addremovebutton} ${
                            index < 1
                              ? classes.iconMarginSet
                              : classes.iconMarginUnSet
                          }`
                        }}
                        style={{ marginLeft: "10px" }}
                        onClick={(event) =>
                          addEnvRow(event, index, "Dependency")
                        }
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                    {index > 0 && (
                      <Grid item={true}>
                        <IconButton
                          aria-label="delete"
                          classes={{ root: classes.addremovebutton }}
                          style={{ marginLeft: "10px" }}
                          onClick={(event) =>
                            removeRow(event, index, "Dependency")
                          }
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
        <Divider />
        {outfile.map((file, index) => {
          return (
            <React.Fragment key={`$index`.toString() + " OUTF"}>
              <Grid container spacing={3} style={{ marginTop: "1px" }}>
                <Grid item={true} xs={1}></Grid>
                <Grid item={true} xs={9}>
                  <TextField
                    id="filled-full-width"
                    style={{ margin: 8 }}
                    placeholder="Output Files"
                    helperText="Output Files generated during execution"
                    fullWidth
                    value={file["outfiles"]}
                    onChange={(event) =>
                      saveUserInputs(event, "OutputFiles", index)
                    }
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{
                      classes: {
                        root: classes.textfield
                      }
                    }}
                    variant="filled"
                  />
                </Grid>

                <Grid item={true} xs={2} style={{ marginTop: "10px" }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item={true}>
                      <IconButton
                        aria-label="Add"
                        onClick={(event) =>
                          addEnvRow(event, index, "OutputFiles")
                        }
                        classes={{
                          root: `${classes.addremovebutton} ${
                            index < 1
                              ? classes.iconMarginSet
                              : classes.iconMarginUnSet
                          }`
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                    {index > 0 && (
                      <Grid item={true}>
                        <IconButton
                          aria-label="delete"
                          classes={{ root: classes.addremovebutton }}
                          onClick={(event) =>
                            removeRow(event, index, "OutputFiles")
                          }
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          );
        })}
        <Divider />
        <Grid container spacing={3}>
          <Grid item={true} xs={3}></Grid>
          <Grid item={true} xs={2}>
            <IconButton
              aria-label="Add"
              onClick={(event) => saveandclose(event, "Save")}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item={true} xs={2}>
            <IconButton
              aria-label="Add"

            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Drawer>
    </React.Fragment>
  );
};
