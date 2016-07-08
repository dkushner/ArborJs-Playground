import React, { PropTypes } from 'react';
import classes from './Rule.scss';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../modules/workspace';
import classNames from 'classnames';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Arbor from 'arborjs';

const ruleSource = {
  beginDrag(props) {
    return { 
      signature: props.predecessor.value,
      ruleId: props.ruleId
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class Rule extends React.Component {
  static propTypes = {
    ruleId: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    predecessor: PropTypes.object.isRequired,
    production: PropTypes.object.isRequired,
    removeRule: PropTypes.func.isRequired,
    setPredecessor: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired
  };

  handlePredecessorChange() {
    const { ruleId, setPredecessor } = this.props;
    setPredecessor(ruleId, this.refs.predecessor.value);
  }

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  render() {
    const { ruleId, open, predecessor, production } = this.props;
    const { removeRule, toggleRule, setPredecessor } = this.props;
    const { connectDragSource, isDragging } = this.props;

    const containerClass = classNames([classes.container, { 
      [classes.open]: open && !isDragging 
    }]);

    const dragSource = connectDragSource(
      <div className={classes.handle}>
        <i className={"fa fa-ellipsis-v"}></i>
      </div>
    );

    return (
      <div className={containerClass}>
        <div className={classes.predecessor}>
          <a className={classes.toggle} href="#" onClick={() => toggleRule(ruleId)}>
            {String.fromCharCode(9654)}
          </a>
          <input type="text" 
                 ref="predecessor"
                 value={predecessor.value} 
                 className={classes.signature}
                 onChange={this.handlePredecessorChange.bind(this)} />
          <a className={classes.remove} 
             href="#" 
             onClick={() => removeRule(ruleId)}>
            <i className={"fa fa-times"} />
          </a>
          {dragSource}
        </div>
      </div>
    );
  }
}

export default DragSource(ItemTypes.RULE, ruleSource, collect)(Rule);
