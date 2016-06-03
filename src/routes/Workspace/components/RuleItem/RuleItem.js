import React, { PropTypes } from 'react';
import classes from './RuleItem.scss';
import Arbor from 'arborjs';

class RuleItem extends React.Component {
  static propTypes = {
    rule: PropTypes.object.isRequired
  };

  render() {
    const { rule } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.definition}>
          <div className={classes.predecessor}>{rule.predecessor}</div>
          <div className={classes.production}>
            {rule.production}
          </div>
        </div>
      </div>
    );
  }
}

export default RuleItem;
