import React from 'react';
import classes from './Workspace.scss';
import ToolboxContainer from '../../containers/ToolboxContainer';

export const Workspace = (props) => (
  <div className={classes.workspace}>
    <div className={classes.upper}>
      <div className={classes.toolboxContainer}>
        <ToolboxContainer />
      </div>
      <div className={classes.stageContainer}></div>
    </div>
    <div className={classes.lower}>
      <div className={classes.scrubContainer}></div>
    </div>
  </div>
);

Workspace.props = {
  name: React.PropTypes.string.required
};

export default Workspace;
