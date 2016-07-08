import React from 'react';
import classes from './Axiom.scss';
import classNames from 'classnames';
import { ItemTypes } from '../../modules/workspace';
import { DropTarget } from 'react-dnd';

const axiomTarget = {
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

class Axiom extends React.Component {
  render() {
    const { isOver, connectDropTarget } = this.props;

    const dropzoneClass = classNames(classes.dropzone, {
      [classes.over]: isOver
    });

    return connectDropTarget(
      <div className={classes.container}>
        <label className={classes.label}>Axiom</label>
        <div className={dropzoneClass}></div>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.RULE, axiomTarget, collect)(Axiom);
