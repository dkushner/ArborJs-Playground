import React, { PropTypes } from 'react';
import classes from './Toolbox.scss';
import Arbor from 'arborjs';

class Toolbox extends React.Component {
  static propTypes = {
    constants: PropTypes.object,
    rules: PropTypes.object
  };

  render() {
    const { constants, rules } = this.props;

    const constantItems = Object.values(constants).map((constant) => {
      return (
        <li>
          <ConstantItem constant={constant} />
        </li>
      );
    });

    const ruleItems = Object.values(rules).map((rule) => {
      return (
        <li>
          <RuleItem rule={rule} />
        </li>
      );
    })

    return (
      <div className={classes.toolbox}>
        <ul className={classes.constantList}>
          {constantItems}
        </ul>
        <ul className={classes.ruleList}>
          {ruleItems}
        </ul>
      </div>
    );
  }
}

export default Toolbox;
