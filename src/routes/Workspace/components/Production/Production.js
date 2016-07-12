import React, { PropTypes } from 'react';
import classes from './Conditional.scss';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../modules/workspace';
import { getEmptyImage } from 'react-dnd-html5-backend';

class Production extends React.Component {
  static propTypes = {
  };

  render() {
  }
}

export default DragSource(ItemTypes.PRODUCTION, constantSource, collect)(Constant);

