import React from 'react';
import _snakeCase from 'lodash/snakeCase'

class Settings extends React.Component {
  render() {
    return (
      <div>{_.snakeCase("HI settings")}</div>
    )
  }
}

export default Settings;