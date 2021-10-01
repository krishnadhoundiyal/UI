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
