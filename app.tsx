import React from 'react'
import { ReactWidget } from '@jupyterlab/apputils'
export class ReactAppWidget extends ReactWidget {
  constructor() {
    super()
  }

  render(): JSX.Element {
    return (

        <AppComponent />
    )
  }
}

// Write all of your React here
const AppComponent = (): JSX.Element => {
  return (
    <div>
      TEST
    </div>
  )
}
