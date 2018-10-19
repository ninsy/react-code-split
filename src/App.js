import React, { Component } from 'react';

import { Router } from "@reach/router";
import { Async } from './Async';

const Main = Async('./Main');
const ResetPassword = Async('./ResetPassword');

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Main path='/' default/>
          <ResetPassword path='/reset' />
        </Router>
      </div>
    );
  }
}

export default App;
