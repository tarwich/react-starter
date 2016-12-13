// Libraries
import * as React from 'react';
// Components
import {FetchedThing} from '../FetchedThing';

// Local interfaces
interface IProperties {}
interface IState {}

export class DemoApp extends React.Component<IProperties, IState> {
  render() {
    let date = new Date().toLocaleString();
    return (
      <div className='DemoApp'>
        This is the demo app {date}
        <FetchedThing />
      </div>
    );
  }
}
