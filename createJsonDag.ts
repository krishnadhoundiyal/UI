import { v4 as uuidv4 } from 'uuid';
export const ConvertToJsonDag = (elements) => {
    let dag = {
      "name" : "Dag_generated_Explorer" + uuidv4().toString(),
      "pipeline_description" : "Take This from User",
      nodes : [],
      connections : [],
    }
    let nodeItems = elements.filter((selectedItem, sIndex)=> {
      if (selectedItem.id.toString() == "1" || !("data" in selectedItem)) {
        return false;
      }
      return true;
    }).map((items,index) => {
      //ignore first element - remove this later
      if (items.id.toString() != "1") {
        if ("data" in items) {
          //node elements
          console.log(items.data.label);
          let type = items.data.label.props.children[1].props.children;
          let rObj  = {};
          rObj["name"] = items.id;
          rObj["type"] = type;
          rObj["task_id"] = items.id;
          return rObj;

        }
      }
    });
    //connections Dag
    let conn = {};
    let connections = elements.filter((sItems,sIndex) => {
      if ("source" in sItems && sItems.source.toString() != "1") {
        return true;
      }
      return false;
    }). reduce ((previousValue,currentValue,currentIndex,arr) => {
       if (currentValue.source in previousValue) {
         previousValue[currentValue.source].push(currentValue.target);
       } else {
         previousValue[currentValue.source] = [currentValue.target];
       }
       return previousValue;
    },{});
    dag.nodes = nodeItems;
    dag.connections = connections;
    return dag;
  }
  export const ConvertConfToDesiredObj  = (elements) => {
    let dockerImageLookUp = {
      "Pandas" : "docker.io/amancevice/pandas:1.1.1",
      "PyTorch" : "docker.io/amancevice/pandas:1.1.1"
    }
    let configuration = Object.keys(elements).map((items) => {
      let temp_obj = {}
      temp_obj["id"] = elements[items]["id"];
      temp_obj["label"] = elements[items]["label"];
      temp_obj["type"] = elements[items]["type"];
      temp_obj["filename"] = elements[items]["jupyterFilePath"];
      if (elements[items]["type"] == "JupyterLabNotebook") {
        temp_obj["type"] = "NoteBook";
      }

      temp_obj["runtime_image"] = dockerImageLookUp[elements[items]["jupyterNotebookDockerImage"]];
      temp_obj["dependencies"] = elements[items]["juputerNotebookDependency"].map((items1) => {
                                                            return items1["fileSelected"]
                                                          }).filter((ele) => {
                                                            if (ele != "") {
                                                              return true;
                                                            } else {
                                                              return false;
                                                            }
                                                          });
      temp_obj["outputs"] = elements[items]["jupyterNotebookOutFiles"].map((items1) => {
                                                            return items1["outfiles"]
                                                          }).filter((ele) => {
                                                            if (ele != "") {
                                                              return true;
                                                            } else {
                                                              return false;
                                                            }
                                                          });
      temp_obj["env_vars"] = elements[items]["jupyterNotebookEnvironVar"];
      /*temp_obj["cpu"] = 1;
      temp_obj["gpu"] = 0;
      temp_obj["memory"] = 1;*/
      return temp_obj
    });
    return configuration;
  }
