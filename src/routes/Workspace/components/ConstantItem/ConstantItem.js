import React, { PropTypes } from 'react';
import classes from './ConstantItem.scss';

export const ConstantItem = (props) => {
  const { symbol, parameters, description } = props;

  return (
    <div className={classes.container}>
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
      {description}
      <ul className={classes.parameters}>
        {parameters.map((param) => {
          return (
            <li key={param.name} className={classes.parameter}>
              <span className={classes.name}>{param.name}</span>
              {param.description}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ConstantItem.propTypes = {
  symbol: PropTypes.string.isRequired,
  parameters: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired
};

export default ConstantItem;
