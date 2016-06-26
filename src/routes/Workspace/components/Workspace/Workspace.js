import React from 'react';
import classes from './Workspace.scss';
import ToolboxContainer from '../../containers/ToolboxContainer';
import _ from 'lodash';
import { Notifs } from 're-notif';
import ScrubContainer from '../../containers/ScrubContainer';
import StageContainer from '../../containers/StageContainer';

class Workspace extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    errors: React.PropTypes.array
  }

  handleResize() {
    const { setDimensions } = this.props;
    const { width, height } = this.refs.stage.getBoundingClientRect();
    setDimensions(width, height);
  }

  componentDidMount() {
    window.addEventListener('resize', _.throttle(this.handleResize.bind(this), 300));
    setTimeout(() => {
      this.handleResize();
    }, 500);
  }

  render() {
    const { name, errors } = this.props;

    return (
      <div className={classes.workspace}>
        <div className={classes.upper}>
          <div className={classes.toolboxContainer}>
            <ToolboxContainer />
          </div>
          <div ref="stage" className={classes.stageContainer}>
            <StageContainer />
          </div>
        </div>
        <div className={classes.lower}>
          <div className={classes.scrubContainer}>
            <ScrubContainer />
          </div>
        </div>
        <div className={classes.errors}>
          <Notifs />
        </div>
      </div>
    );
  }
}

export default Workspace;
