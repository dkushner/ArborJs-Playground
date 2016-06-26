import React, { PropTypes } from 'react';
import classes from './Rule.scss';
import classNames from 'classnames';
import Arbor from 'arborjs';

class Rule extends React.Component {
  static propTypes = {
    ruleId: PropTypes.string.isRequired,
    predecessor: PropTypes.object.isRequired,
    production: PropTypes.object.isRequired
  };

  componentDidUpdate(props, state) {
    if (props.predecessor.editing) {
      this.refs.predecessor.focus();
    }

    if (props.production.editing) {
      this.refs.production.focus();
    }
  }

  handleKeyDown(target, event) {
    console.log(event.which);
    if (event.which == 13 || event.which == 27) {
      event.preventDefault();
      this.refs[target].blur();
    }
  }

  handleBlur(target) {
    const { ruleId, onEdit, onUpdate } = this.props;
    const { predecessor, production } = this.refs;
    onEdit(ruleId, target);
    onUpdate(ruleId, predecessor.textContent, production.textContent);
  }

  render() {
    const { ruleId, predecessor, production, onRemove, onUpdate, onEdit } = this.props;

    const predecessorClasses = classNames(classes.predecessor, {
      [classes.editing]: predecessor.editing
    });

    const productionClasses = classNames(classes.production, {
      [classes.editing]: production.editing
    });

    return (
      <div className={classes.container}>
        <div className={classes.definition}>
          <div className={predecessorClasses}
               ref="predecessor" 
               contentEditable={predecessor.editing}
               onClick={() => !predecessor.editing && onEdit(ruleId, "predecessor")}
               onKeyDown={this.handleKeyDown.bind(this, "predecessor")}
               onBlur={this.handleBlur.bind(this, "predecessor")}>
            {predecessor.raw}
          </div>
          <div className={productionClasses}
               ref="production" 
               contentEditable={production.editing}
               onClick={() => !production.editing && onEdit(ruleId, "production")}
               onKeyDown={this.handleKeyDown.bind(this, "production")}
               onBlur={this.handleBlur.bind(this, "production")}>
            {production.raw}
          </div>
        </div>
        <a href="#" className={classes.remove} onClick={() => onRemove(ruleId)}>
          <i className={"fa fa-close"} />
        </a>
      </div>
    );
  }
}

export default Rule;
