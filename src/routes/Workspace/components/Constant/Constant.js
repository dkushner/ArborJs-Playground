import React, { PropTypes } from 'react';
import classes from './Constant.scss';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../modules/workspace';
import { getEmptyImage } from 'react-dnd-html5-backend';

const constantSource = {
  beginDrag(props) {
    let arglist = props.parameters.map(parameter => parameter.name).join(', '); 

    if (!!arglist) {
      arglist = '(' + arglist + ')';
    }

    return {
      signature: [props.symbol, arglist].join('')
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

class Constant extends React.Component {
  static propTypes = {
    symbol: PropTypes.string.isRequired,
    parameters: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    toggleConstant: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  render() {
    const { constantId, symbol, parameters, description, open } = this.props;
    const { toggleConstant } = this.props;
    const { connectDragSource, isDragging } = this.props;

    const dragSource = connectDragSource(
      <div className={classes.handle}>
        <i className={"fa fa-ellipsis-v"}></i>
      </div>
    );

    const containerClass = classNames([classes.container, {
      [classes.open]: open && !isDragging
    }]);

    return (
      <div className={containerClass}>
        <div className={classes.predecessor}>
          <a className={classes.toggle} href="#" onClick={() => toggleConstant(constantId)}>
            {String.fromCharCode(9654)}
          </a>
          <span className={classes.signature}>
            {symbol}
            {parameters.length ? "(" : ""}
            {parameters.map((param, i) => {
              let divider = (i + 1 < parameters.length) && ", ";
              return (
                <span className={classes.parameter}>{param.name}{divider}</span>
              );
            })}
            {parameters.length ? ")" : ""}
          </span>
          {dragSource}
        </div>
        <div className={classes.description}>
          {description}
        </div>
      </div>
    );
  }
}

export default DragSource(ItemTypes.RULE, constantSource, collect)(Constant);
