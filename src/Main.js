import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Loadable from "react-loadable";
import ProgressBar from 'react-toolbox/lib/progress_bar';
import { Router, Link } from "@reach/router";

const Invoices = Loadable({
  loading: () => <ProgressBar type='circular' mode='indeterminate' multicolor />,
  loader: () => import('./Invoice')
});

const Settings = Loadable({
  loading: () => <ProgressBar type='circular' mode='indeterminate' multicolor />,
  loader: () => import('./Settings')
});

const Patients = Loadable.Map({
  loading: () => <ProgressBar type='circular' mode='indeterminate' multicolor />,
  loader: {
    PatientsComponent: () => import('./Patients'),
    patientList: () => Promise.resolve(
      [
        { "id": 1, "name": "Frank", "catUrl": "./1.jpg", createdAt: "2017-1-3"},
        { "id": 2, "name": "John", "catUrl": "./1.jpg", createdAt: "2018-1-3"},
        { "id": 3, "name": "Mark", "catUrl": "./1.jpg", createdAt: "2018-3-3"}   
      ]
    )
  },
  render(loaded, props) {
    let PatientsComponent = loaded.PatientsComponent.default;
    let patientList = loaded.patientList;
    return <PatientsComponent patients={patientList} />;
  },
});

// TODO: show bare-bones AsyncComponent used in HA
// TODO: mention contradiction between webpack 'entry' value and this kind of dynamic load

class Main extends Component {
  
  onMouseOver = () => {
    Settings.preload();
  };
  
  render() {

    const invoices = [
      { issueDate: '2018-10-11', paid: true,  },
      { issueDate: '2018-10-19', paid: false, },
      { issueDate: '2018-12-19', paid: true,  },
      { issueDate: '2018-12-13', paid: true,  },
      { issueDate: '2018-12-09', paid: false, },
      { issueDate: '2018-12-01', paid: false, },      
    ];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>
            <Link to="/patients"><button>Patients</button></Link>
            <Link to="/invoices"><button>Invoices</button></Link>
            <Link to="/settings"><button onMouseOver={this.onMouseOver}>Settings</button></Link>
          </div>
        </header>
        <div>
          <Router>
            <Patients path="/patients" />
            <Invoices path="/invoices" invoices={invoices} />
            <Settings path="/settings" />
          </Router>
        </div>
      </div>
    );
  }
}

export default Main;
