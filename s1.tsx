import React, {useEffect} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import Tooltip from '@material-ui/core/Tooltip';
import $ from 'jquery';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    selectedItems: {
        backgroundColor:"red"
    },

    nested: {
      paddingLeft: theme.spacing(4),
      borderLeftColor:"white",
      borderLeft:"solid",
       '&:hover': {
        borderLeft:"solid",
        borderLeftColor:"#303C6C"
      }
    },
  }),
);
export const PermanentDrawerLeft = (props): JSX.Element => {
  const [ menu, setMenu ] = React.useState({});
  const [ that, setThat ] = React.useState({"RuleHelpText":{}});
  const [ refreshProps, setrefreshProps ] = React.useState(false);


  const handleClick = (item) => {
      let newData = {...menu, [item] : !menu[item]};
      setMenu(newData);
  }
  const classes = useStyles();
  useEffect(() => {
    setThat(props['helpText']);
    setrefreshProps(props['refresh']);
    let msg = {
"data": [
  {
    "Details": "<em>This rule is used to transpose columns present in the input data</em><ul><li>Columns to Transpose is configurable via Regex or Literal text</li><li>Pivotted columns are configured as fixed columns</li></ul>",
    "Version": "1",
    "Version_Name": "TransposeExcel",
    "ruleName": "TransposeExcel"
  },
  {
    "Details": "<em>This rule is used to perform SQL like JOIN between two or multiple Dataframes based on one or more columns as joining key</em><ul><li>Outer</li>Inner<li>Left</li><li>Right</li></ul>",
    "Version": "1",
    "Version_Name": "Enrich",
    "ruleName": "EnrichEvaluation"
  },
  {
    "Details": "<em>This rule is used to apply formula on columns of a dataframe and stores the vaule in a new column</em>",
    "Version": "1",
    "Version_Name": "ApplyFormulaOnDF",
    "ruleName": "ApplyFormulaRule"
  },
  {
    "Details": "<em>This rule is to Filter rows in a dataFrame based on conditions and returns filtered output</em><ul><li>Grouping of conditions</li><li>Conditions based on variables</li></ul>",
    "Version": "1",
    "Version_Name": "FilterRows",
    "ruleName": "FilterRows"
  },
  {
    "Details": "<em>This rule is to bifurcate dataFrame into subsets based on the condition and operations can be individually performed on both</em><ul><li>Empty Results are inhibited from processing</li></ul>",
    "Version": "1",
    "Version_Name": null,
    "ruleName": "Conditional Control"
  },
  {
    "Details": "<em>This control is used to execute all branches attached sequentially, the status of the Rule is set to true if all the descendants branches have successfully executed, use this rule in the below use cases</em><ul><li>Perform sequential operations of branched</li><li>Multiple seqeunce classes can be grouped together for cases where the sequential branches exceed the provided ports</li><li>Press Apply once configured</li></ul>",
    "Version": "1",
    "Version_Name": null,
    "ruleName": "Sequence Control"
  },
  {
    "Details": "<em>This rule is to execute attached branches in port based on priority, with leftmost having the highest priority and a default mandatory port. This rule stop executing its branches if any of the preceeding branch successfully completed its execution</em><ul><li>The Control has 4 ports and a default port which have priority from left to right. (left has the highest priority)</li><li>If the branch with higher priority fails subsequently the branch with the next highest priority executes.</li><li>If the branch with higher priority executes successfully the branches with lower priority will not execute</li><li>Press Apply once configured</li></ul>",
    "Version": "1",
    "Version_Name": null,
    "ruleName": "Selector Control"
  },
  {
    "Details": "<em>This rule repeats over the specified branch given a function which returns a generator.</em><ul> <li>This class can used to read data from a big file in chunks and do certain set of operations to all the chunks, rule has a splitter and configurable combiner function</li></ul>",
    "Version": "1",
    "Version_Name": null,
    "ruleName": "Iterable Control"
  },
  {
    "Details": "<em>This rule is generating some text in a customizable textbox, that can be placed in a PowerPoint template design.Functions Performed: </em><ul><li>fetches TextBox data from dataFrame</li><li>Customizable width and height of the textbox</li></ul>",
    "Version": "1",
    "Version_Name": "PowerPointTextBox",
    "ruleName": "PPTTextBox"
  },
  {
    "Details": "<em>This rule is generating PowerPoint table and saves it in memory.Performs functions as:</em><ul><li>Customizable width and height of the table</li><li>Drops columns if needed from the table</li><li>Functionality to set different colors to each column/header using a separate color data frame in existing PowerPoint table module</li></ul>",
    "Version": "1",
    "Version_Name": "PowerPointTable",
    "ruleName": "PPTTable"
  },
  {
    "Details": "<em>This rule is used to generate plain text subtitles.Functions perfomed:</em><ul><li>Fetches subtitle data from dataframe</li><li>Places subtitles in PPT</li></ul>",
    "Version": "1",
    "Version_Name": "PowerPointSubtitles",
    "ruleName": "PPTSubtitles"
  },
  {
    "Details": "<em>This rule is used to generate BarCharts and Histograms and save it as a pdf on a given file-path</em>",
    "Version": "1",
    "Version_Name": "GraphGeneration",
    "ruleName": "GraphGeneration"
  },
  {
    "Details": "<em>This rule is used to generate the different types of plots</em><ul> <li>polygon</li><li>fans</li><li>scatter</li><li>clutters</li><li>sample points</li></ul>",
    "Version": "1",
    "Version_Name": "MapGenerateGen",
    "ruleName": "MapGenerate"
  },
  {
    "Details": "<em>This rule is used for Reading csv or excel files.</em><ul><li>Multiple Files/Subsheets</li><li>Limit Columns to process</li></ul>",
    "Version": "1",
    "Version_Name": "ExcelReader",
    "ruleName": "ExcelReaderRule"
  },
  {
    "Details": "<em>This rule is used for fetching data from different databases </em> <ul><li>My-SQL</li><li>MongoDB</li><li>MS SQL</li></ul>",
    "Version": "1",
    "Version_Name": "DataExtractEvaluation",
    "ruleName": "DataExtractRule"
  },
  {
    "Details": "<em>This rule is used to write dataframe into excel file.</em><ul><li>Accepts a dataframe</li><li>Generates an excel file based on dataframe</li></ul>",
    "Version": "2",
    "Version_Name": "ExcelGenerator",
    "ruleName": "ExcelGenerator"
  },
  {
    "Details": "<ul><li>Recipients</li><li>Attachments</li><li>Dynamic Email Content</li></ul>",
    "Version": "1",
    "Version_Name": "Email",
    "ruleName": "EmailRules"
  },
  {
    "Details": "<em>This rule is used for sorting dataframe based on specific parameters.</em><ul><li>On a dataframe sorting operation is performed</li><li>Gives a sorted dataframe for further use</li></ul>",
    "Version": "1",
    "Version_Name": "sort_values",
    "ruleName": "SortValues"
  },
  {
    "Details": "<em>This rule is used to concatenate multiple dataframes.It accepts two or more dataframes and gives a single dataframe as output.</em>",
    "Version": "1",
    "Version_Name": "concatenate",
    "ruleName": "Concatenate"
  },
  {
    "Details": "<em>Execute remote commands  on customer server </em> <ul><li>using VPN connectivity</li><li> or RSG connectivity</li></ul>",
    "Version": "1",
    "Version_Name": "RemoteCommands",
    "ruleName": "RemoteCommand"
  },
  {
    "Details": "<em>This rule is to parse data in the form of dataframe from log files which is selected based on pattern of the files<em><br>Additional functionality:<ul><li>Skip rows between header and data</li><li>Transpose parsed dataframe</li></ul>",
    "Version": "1",
    "Version_Name": "LogParser",
    "ruleName": "LogParser"
  },
  {
    "Details": "<em>This class handles Timeseries and Non-Timeseries graphs Types of Graph</em><ul><li>Line</li><li>Bar</li><li>Stacked Bar</li><em>Can be saved as to a file-location</em><ul><li>PDF</li></ul>",
    "Version": "1",
    "Version_Name": "GraphManager",
    "ruleName": "GraphManager"
  },
  {
    "Details": "<em>This rule is used to execute a custom Library function on an input data</em><br>Additional Functionality:<ul><li>Multiple Library Functions can be configured</li><li>Additonal inputs can be added</li><li>Functional parameters can be passed in the form of comma separated key value pair</li></ul>",
    "Version": "1",
    "Version_Name": "OperateDataFrame",
    "ruleName": "OperateDataFrame"
  },
  {
    "Details": "<em>This rule is used to call a Rest Api</em><br>Supported Methods<ul><li>GET</li><li>POST</li><li>PUT</li><li>DELETE</li></ul><br>Functionality:<ul><li>Request and Response Handling functions are configurable</li><li>Api Authorization is possible</li></ul>",
    "Version": "1",
    "Version_Name": "HTTP_Request",
    "ruleName": "HTTP Request"
  },
  {
    "Details": "<em>This rule is used to transfer files from or to an FTP location</em><br>Supported Operations<ul><li>PULL</li><li>PUSH</li></ul><br>Functionality:<ul><li>Pull files from a remote FTP location to a path on the local system</li><li>Push files to a remote FTP location from a path on the local system</li><li>Transfer files based on a given file extension(optional)</li></ul>",
    "Version": "1",
    "Version_Name": "FTPTransfer",
    "ruleName": "FTPPullPush"
  },
  {
    "Details": "<em>This rule is used to transfer files from or to a Sharepoint location</em><br>Supported Operations<ul><li>PULL</li><li>PUSH</li></ul><br>Functionality:<ul><li>Pull files from a remote Sharepoint location to a path on the local system</li><li>Push files to a remote Sharepoint location from a path on the local system</li><li>Transfer files based on a given file extension(optional)</li></ul>",
    "Version": "2",
    "Version_Name": "sharepointTransfer",
    "ruleName": "SharePointPullPush"
  },
  {
    "Details": "<em>This rule is used to transfer files from or to a GoogleDrive location</em><br>Supported Operations<ul><li>PULL</li><li>PUSH</li></ul><br>Functionality:<ul><li>Pull files from a remote GoogleDrive location to a path on the local system</li><li>Push files to a remote GoogleDrive location from a path on the local system</li><li>Transfer files based on a given file extension(optional)</li></ul>",
    "Version": "1",
    "Version_Name": "GoogleDriveTransfer",
    "ruleName": "GoogleDrivePullPush"
  },
  {
    "Details": "<em>Adds the capability of pull / push from / to a remote location via SSH File Transfer Protocol</em><ul><li>File Names and patterns both are supported</li><li>Files can also be zipped before transfer to avoid network congestion.</li></ul>",
    "Version": "1",
    "Version_Name": "SftpPullPush",
    "ruleName": "SftpPullPush"
  },
  {
    "Details": "<em>Adds the capability to connect a UNIX Machine with a client machine behind a Gateway / Firewall via port forwarding.</em>",
    "Version": "1",
    "Version_Name": "ManualRSG",
    "ruleName": "ManualRSG"
  },
  {
    "Details": "<em>CopyExcelToPPT This class is used to copy entitites like Images, Tables and Subtitles from .xlsx or .xlsm file and place them in the powerpoint presentation with a providd template and input sheets.</em>",
    "Version": "1",
    "Version_Name": "CopyExcelToPPT",
    "ruleName": "CopyExcelToPPT"
  },
  {
    "Details": "<em>Share Point File Processing</em><ul><li>Checkout files</li><li>Download and modify files</li><li>Upload and Check-in files</li></ul>",
    "Version": "1",
    "Version_Name": "SharePointFileProcessing",
    "ruleName": "SharePointFileProcessing"
  },
  {
    "Details": "<em>This rule takes all entities present in EntityCollection instance and with a PPT template provided, places them one by one in PowerPoint Presentation</em>",
    "Version": "1",
    "Version_Name": "PPTPlacement",
    "ruleName": "PPTPlacement"
  },
  {
    "Details": "<em>Provides excel based conditional coloring.</em>",
    "Version": "1",
    "Version_Name": "ExcelFormatter",
    "ruleName": "ExcelFormatter"
  },
  {
    "Details": "<em>Provides user the functionality to see the output of all previous executed rules on Automation Engine UI.</em>",
    "Version": "1",
    "Version_Name": "DebugControl",
    "ruleName": "DebugControl"
  }
],
"status_code": 200
};
          let ruleDescr = msg['data'];
          let ruleDesrObj = {};
          let versionDesrObj = {};
          for (let iCnt=0;iCnt<ruleDescr.length;iCnt++){
            ruleDesrObj[ruleDescr[iCnt]["ruleName"]] = ruleDescr[iCnt]["Details"];
            versionDesrObj[ruleDescr[iCnt]["ruleName"]] = ruleDescr[iCnt]["Version_Name"];
          }

          }, []);
          const workerList = [
              {
                  "functionType" : "Global Components",
                  "functionData" : [
                      {
                          "expandoName":"Controls",
                          "nodes":[
                            {node:'Selector Control', icon:'selectall'},
                            {node:'Sequence Control',icon:'accounttree'},
                            {node:'Iterable Control',icon:'cached'},
                            {node:'Conditional Control',icon:'help'},
                            {node:'DebugControl',icon:'debug'}
                          ]
                      },
                      {
                          "expandoName":"Data Reader / Writer",
                          "nodes":[
                            {node : 'ExcelReaderRule',icon:'description'},
                            {node:'DataExtractRule',icon:'attachfile'},
                            //{node:'LogParser',icon:'comparearrows'},
                            {node:'ExcelGenerator',icon:'filecopy'},
                            {node:'OssParser',icon:'sort'},
                          ]
                      },
                      {
                          "expandoName":"Data Transfer",
                          "nodes":[
                            {node:'EmailRules',icon:'email'},
                            {node:'FTPPullPush',icon:'datausage'},
                            {node:'SharePointPullPush',icon:'share'},
                            {node:'SharePointFileProcessing', icon:'share'},
                            {node:'GoogleDrivePullPush',icon:'foldershared'},
                            {node:'HTTP Request',icon:'http'},
                            {node:'SftpPullPush',icon:'datausage'},
                            {node:'ManualRSG',icon:'datausage'},
                          ]
                      },
                      {
                          "expandoName":"Data Transformation",
                          "nodes":[
                            {node:'SortValues',icon:'sort'},
                            {node:'Concatenate',icon:'add'},
                            {node:'FilterRows',icon:'filter'},
                            {node:'ApplyFormulaRule',icon:'linestyle'},
                            {node : 'EnrichEvaluation',icon:'track'},
                            {node:'OperateDataFrame',icon:'frame'},
                            {node:'TransposeExcel',icon:'transform'},
                            {node:'RemoteCommand',icon:'addcomment'},
                            // {node:'XmlParser',icon:'addcomment'},
                          ]
                      },
                      {
                          "expandoName":"Visualization",
                          "nodes":[
                            {node:'GraphManager',icon:'trendingup'},
                            {node:'MapGenerate',icon:'explore'},
                            {node:'PPTPlacement',icon:'presenttoall'},
                            {node:'GraphGeneration',icon:'insertchart'},
                            {node:'PPTSubtitles',icon:'recordvoiceover'},
                            {node:'PPTTextBox',icon:'textfield'},
                            {node:'PPTTable',icon:'tablechart'},
                            {node:'CopyExcelToPPT',icon:'insertchart'},
                            {node:'ExcelFormatter',icon:'insertchart'},
                          ]
                      }
                  ]
              }
          ];
          return (
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
              >

                  {workerList.map((param, wlIndex) => {
                      let functionType = param['functionType']
                      let functionTypeData = param['functionData']

                      return(
                          <React.Fragment>
                              <ListItem button onClick={() => handleClick(functionType)}>
                                  {menu[functionType] ? <ChevronLeftIcon /> : <ChevronRightIcon />}

                                  <ListItemText disableTypography style={{ fontWeight: 'bold',paddingLeft:"10px" }} primary={functionType} />

                              </ListItem>
                              <Collapse in={(menu[functionType]) ? false : true} timeout="auto" unmountOnExit>
                                  {functionTypeData.map((functionDataToPrint, ftdIndex) => {
                                      let expandoName = functionDataToPrint['expandoName']
                                      let nodeDet = functionDataToPrint['nodes']
                                      return(
                                          <React.Fragment>
                                              <List component="div" disablePadding style={{marginLeft:"10px"}} >

                                                  <ListItem  button className={classes.nested} onClick={() => handleClick(expandoName)}>
                                                      {menu[expandoName] ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                                      <ListItemText disableTypography style={{ fontWeight: 'bold',paddingLeft:"10px" }}  primary={expandoName} />

                                                  </ListItem>
                                                  <Collapse in={(menu[expandoName]) ? true : false} timeout="auto" unmountOnExit>
                                                      {nodeDet.map((text, index1) => {
                                                          let nodeType = "SomeType";
                                                          let thisnodeName = text.node
                                                          let thisNodeIcon = text.icon
                                                          let dynaText = ""
                                                        
                                                          return(
                                                              <React.Fragment>

                                                                  <List component="div" disablePadding style={{paddingLeft:"15px"}} >
                                                                      <ListItem button className={classes.nested}>



                                                                      <ListItemText primary={thisnodeName} />
                                                                      </ListItem>
                                                                  </List>
                                                              </React.Fragment>
                                                          )
                                                      })}
                                                  </Collapse>
                                              </List>
                                          </React.Fragment>
                                      )
                                  })}
                              </Collapse>
                          </React.Fragment>
                      )
                  })}
              </List>
          );
}
