// Libraries
import * as React from 'react';
import 'whatwg-fetch';

// Local definitions
interface IState {
  loading: boolean;
  value: string;
}
interface IProperties {}

export class FetchedThing extends React.Component<IProperties, IState> {
  constructor() {
    super();
    this.state = {
      loading: true,
      value: '',
    };
  }
  
  componentDidMount() {
    fetch('api/foo')
    .then(result => {
      console.log('result', result);
      console.log('body', result.body);
    });
  }
  
  render() {
    if (this.state.loading) {
      return (
        <div>
          <i>Loading...</i>
        </div>
      );
    }
    else {
      return (
        <div>
          <b>
            Loaded! <br />
            Value retreived from server: {this.state.value}
          </b>
        </div>
      );
    }
  }
}
