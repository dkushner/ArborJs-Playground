import React from 'react';
import classes from './RootLayout.scss';
import '../../styles/core.scss';

export const RootLayout = ({ children }) => (
  <div className={classes.root}>
    {children}
  </div>
);

RootLayout.props = {
  children: React.PropTypes.element.required
};

export default RootLayout;
