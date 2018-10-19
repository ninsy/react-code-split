import React from 'react';
import Loadable from 'react-loadable';
import moment from 'moment';
import _ from 'lodash';

const Kittez = Loadable({
  loading: () => 'Kittiez inc',
  loader: () => import('./Kittez'),
})

class Patient extends React.Component {
  state = {
    dialogOpen: false,
  }
  toggleImage = () => {
    this.setState({ showImage: !this.state.showImage });
  };
  render() {
    const { patient } = this.props;
    return (
      <div key={patient.id}>
        <h5>Name: {_.upperCase(patient.name)}</h5>
        <h6>Id: {patient.id}</h6>
        <p>Created at year: {moment(patient.createdAt).format('YYYY')}</p>
        <button onClick={this.toggleImage}>Yay clicks</button>
        { this.state.showImage && <Kittez />}
      </div>
    )
  }
}

class Patients extends React.Component {
  render() {
    const { patients } = this.props;

    return (
      <div>{patients.map((patient => <Patient patient={patient} />))}</div>
    )
  }
}

export default Patients;