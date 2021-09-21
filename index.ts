import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { IDocumentManager } from '@jupyterlab/docmanager';
import {
  FileBrowser,
  FileDialog,
  FileUploadStatus,
  FilterFileBrowserModel,
  IFileBrowserFactory
} from '@jupyterlab/filebrowser';
import { ILauncher } from '@jupyterlab/launcher';
//import { LabIcon } from '@jupyterlab/ui-components';
import { airflow_icon } from './icon';
import { ReactAppWidget } from './app2';
import factoryVar from './reflect';


/**
 * Initialization data for the myextension extension.
 */
 /*interface APODResponse {
  copyright: string;
  date: string;
  explanation: string;
  media_type: 'video' | 'image';
  title: string;
  url: string;
};*/
function addLauncherItems(launcher: ILauncher, app: JupyterFrontEnd, docManager: IDocumentManager, factory: IFileBrowserFactory) {
  console.log("JLSKDJLSDK:LDFK:LSK:LFK:LSKLKD");
  console.log(factory.defaultBrowser.model.manager);
  let commandId = 'some-test';
  // Create a blank content widget inside of a MainAreaWidget
  //const content = new Widget();
  factoryVar["manager"] = docManager;
  console.log(docManager);
  console.log(factory);

  const content = new ReactAppWidget();
  const widget = new MainAreaWidget({ content });
  widget.id = 'apod-jupyterlab';
  widget.title.label = 'Astronomy Picture';
  widget.title.closable = true;
  //Code to put into the main area
  // Add an image element to the content
  //let img = document.createElement('img');
  //content.node.appendChild(img);
  //img.src= "https://apod.nasa.gov/apod/image/2101/2020_12_16_Kujal_Jizni_Pol_1500px-3.png";
  //img.title= "Galaxies and the South Celestial Pole";
  //const widget2 = new ReactAppWidget();
  //widget.attach(widget2,document.body);
  app.commands.addCommand(commandId,{
    label: "Airflow",
    iconClass: 'jp-CodeConsoleIcon',
    icon:airflow_icon,
    execute:() => {
      console.log("JLSKDJLSDK:LDFK:LSK:LFK:LSKLKD");
      if (!widget.isAttached) {
        // Attach the widget to the main work area if it's not there
        app.shell.add(widget, 'main');
      }
      // Activate the widget
      app.shell.activateById(widget.id);
    }
  });
  //palette.addItem({ commandId, category: 'Tutorial' });
  let command : ILauncher.IItemOptions = {
        command: commandId,

        args: {
          //url: new LabIcon({ name: 'ui-components:server-proxy', svgstr: './airflow.svg' }),
          newBrowserTab: true,
          title: 'Running Server',
          id: 'server-launcher'
        },
        category: 'Explorers',

        rank: 0
      };
  launcher.add(command);
}
const extension: JupyterFrontEndPlugin<void> = {
  id: 'some-item-in-launcher',
  autoStart: true,
  requires: [ILauncher,IDocumentManager, IFileBrowserFactory],
  activate: (app:JupyterFrontEnd, launcher: ILauncher, docManager: IDocumentManager,factory: IFileBrowserFactory) => {
    console.log('$$$$$$$$$$$$$-----Triggered------------$$$$$$$$$$$$$');
    /*let data = {
      'title': 'some-item',
      'icon_path': './airflow.png'
    }*/
    addLauncherItems(launcher, app, docManager, factory);
  }
}

export default extension;
