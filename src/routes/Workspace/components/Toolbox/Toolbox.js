import React, { PropTypes } from 'react';
import classes from './Toolbox.scss';
import Dropdown from 'react-dropdown';
import RuleForm from '../RuleForm';
import RuleItem from '../RuleItem';
import Arbor from 'arborjs';

class Toolbox extends React.Component {
  static propTypes = {
    constants: PropTypes.array.isRequired,
    rules: PropTypes.array.isRequired
  };

  handleModeChange(event) {
    this.props.setRenderMode(event.target.value);
  }

  render() {
    const { constants, rules } = this.props;

    const modeOptions = [
      { value: "spline", label: "Spline" },
      { value: "curve", label: "Curve" },
      { value: "text", label: "Text" }
    ];

    return (
      <div className={classes.toolbox}>
        <div className={classes.toolboxSection}>
          <span className={classes.sectionTitle}>Render Mode</span>
          <Dropdown options={modeOptions} 
                    onChange={this.handleModeChange.bind(this)} 
                    baseClassName={"mode-dropdown"}
                    value={modeOptions[0]} />
          <a href="#" className={classes.rolloutToggle}>
            View available constants <i className={"fa fa-long-arrow-right"}></i>
          </a>
        </div>
        <div className={classes.toolboxSection}>
          <span className={classes.sectionTitle}>Rule Set</span>
          <RuleForm />
          <div className={classes.rules}>
            {rules.map((rule) => {
              <RuleItem rule={rule} />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbox;
