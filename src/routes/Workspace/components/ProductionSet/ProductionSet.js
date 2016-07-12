import React, { PropTypes } from 'react';
import classes from './ProductionSet.scss';
import { ItemTypes } from '../../modules/workspace';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import Arbor from 'arborjs';

const productionTarget = {
  drop(props, monitor, component) { },

  canDrop(props, monitor) {
    const item = monitor.getItem();
    return true;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class ProductionSet extends React.Component {
  render() {
    const { isOver, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className={classes.container}>
      </div>
    );
  }
}

export default DropTarget([
  ItemTypes.CONDITIONAL,
  ItemTypes.PRODUCTION
], productionTarget, collect)(ProductionSet);
