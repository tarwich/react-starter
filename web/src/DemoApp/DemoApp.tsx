// Libraries
import * as React from 'react';

// Local interfaces
interface IProperties {}
interface IState {}

export class DemoApp extends React.Component<IProperties, IState> {
  render() {
    return (
      <div className='DemoApp'>This is the demo app</div>
    );
  }
}
