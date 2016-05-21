import React from 'react';
import classes from './Workspace.scss';

export const Workspace = (props) => (
  <div className={classes.workspace}>
    <div className={classes.upstage}>
      <div className={classes['toolbox-container']}>
      </div>
      <div className={classes['stage-container']}>
    </div>
    <div className={classes.downstage}>
    </div>
  </div>
);

Workspace.propTypes = {
  name: React.PropTypes.string.isRequired
};

export default Workspace;
