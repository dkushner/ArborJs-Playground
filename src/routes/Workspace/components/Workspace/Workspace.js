import React from 'react';
import classes from './Workspace.scss';
import ToolboxContainer from '../../containers/ToolboxContainer';
import ScrubContainer from '../../containers/ScrubContainer';

export const Workspace = ({ name }) => (
  <div className={classes.workspace}>
    <div className={classes.upper}>
      <div className={classes.toolboxContainer}>
        <ToolboxContainer />
      </div>
      <div className={classes.stageContainer}></div>
    </div>
    <div className={classes.lower}>
      <div className={classes.scrubContainer}>
        <ScrubContainer />
      </div>
    </div>
  </div>
);

Workspace.props = {
  name: React.PropTypes.string.required
};

export default Workspace;
