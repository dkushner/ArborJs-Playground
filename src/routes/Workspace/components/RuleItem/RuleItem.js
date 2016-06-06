import React, { PropTypes } from 'react';
import classes from './RuleItem.scss';
import Arbor from 'arborjs';

class RuleItem extends React.Component {
  static propTypes = {
    symbol: PropTypes.string.isRequired,
    parameters: PropTypes.array.isRequired,
    production: PropTypes.string.isRequired
  };

  render() {
    const { symbol, parameters, production, onRemove } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.definition}>
          <div className={classes.predecessor}>
            {symbol}
            {parameters.length ? "(" : ""}
            {parameters.map((param, i) => {
              let divider = (i + 1 < parameters.length) && ", ";
              return (
                <span className={classes.parameter}>{param}{divider}</span>
              );
            })}
            {parameters.length ? ")" : ""}
          </div>
          <div className={classes.production}>{production}</div>
          <a href="#" className={classes.remove} onClick={((e) => onRemove({ symbol }))}>
            <i className={"fa fa-close"} />
          </a>
        </div>
      </div>
    );
  }
}

export default RuleItem;
