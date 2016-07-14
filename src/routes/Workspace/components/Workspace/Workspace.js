import React from 'react';
import classes from './Workspace.scss';
import _ from 'lodash';
import { Notifs } from 're-notif';
import ConsoleContainer from '../../containers/ConsoleContainer';
import StageContainer from '../../containers/StageContainer';

class Workspace extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    errors: React.PropTypes.array
  }

  render() {
    const { name, errors } = this.props;

    return (
      <div className={classes.workspace}>
        <div className={classes['console-container']}>
          <ConsoleContainer />
        </div>
        <div ref="stage" className={classes['stage-container']}>
          <StageContainer />
        </div>
      </div>
    );
  }
}

export default Workspace;