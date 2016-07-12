import React, { PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import { ItemTypes } from '../../modules/workspace';

const layerStyle = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 999,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getTransform(props) {
  const { currentOffset, initialOffset } = props;

  if (!initialOffset || !currentOffset) {
    return { display: 'none' };
  }

  let { x, y } = currentOffset;
  let { offsetX, offsetY } = initialOffset;

  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform: transform,
    WebkitTransform: transform,
    width: "auto",
    position: "absolute",
    left: "1em"
  };
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

class WorkspaceDragLayer extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
  };

  renderItem(type, item) {
    switch (type) {
      case ItemTypes.RULE:
        const style = {
          fontSize: "1rem",
          padding: "1em",
          width: "auto",
          whiteSpace: "nowrap",
          background: "#2980b9",
          color: "#fff",
          opacity: 0.6
        };
        return (<div style={style}>{item.signature}</div>);
      default:
        return null;
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyle}>
        <div style={getTransform(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

export default DragLayer(collect)(WorkspaceDragLayer);
