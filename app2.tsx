import React from 'react';
import ReactFlow from 'react-flow-renderer';
import { ReactWidget } from '@jupyterlab/apputils'
import { IFileBrowserFactory } from '@jupyterlab/filebrowser'
import { DnDFlow } from './react-flow'
import factoryVar  from './reflect';
export class ReactAppWidget extends ReactWidget {
  constructor() {

    super();
    



  }

  render(): JSX.Element {
    return (

        <DnDFlow  />
    )
  }
}
