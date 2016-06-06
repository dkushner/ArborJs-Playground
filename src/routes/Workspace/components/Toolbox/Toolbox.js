import React, { PropTypes } from 'react';
import classes from './Toolbox.scss';
import classNames from 'classnames';
import { RenderMode } from '../../modules/toolbox';
import Dropdown from 'react-dropdown';
import RuleForm from '../RuleForm';
import RuleItem from '../RuleItem';
import ConstantItem from '../ConstantItem';
import Arbor from 'arborjs';

class Toolbox extends React.Component {
  static propTypes = {
    constants: PropTypes.array.isRequired,
    rules: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    setRenderMode: PropTypes.func.isRequired,
    addRule: PropTypes.func.isRequired
  };

  render() {
    const { constants, rules, mode, open } = this.props;
    const { addRule, removeRule, setRenderMode, toggleInfo } = this.props;

    const infoClass = classNames(classes.info, { [classes.open]: open });

    const modeOptions = [
      { value: RenderMode.SPLINE, label: "Spline" },
      { value: RenderMode.CURVE, label: "Curve" },
      { value: RenderMode.TEXT, label: "Text" }
    ];

    const modeValue = modeOptions.find(e => e.value == mode);

    return (
      <div className={classes.toolbox}>
        <div className={classes.main}>
          <div className={classes.toolboxSection}>
            <span className={classes.sectionTitle}>Render Mode</span>
            <Dropdown options={modeOptions} 
                      onChange={((e) => setRenderMode(e.value))}
                      baseClassName={"mode-dropdown"}
                      value={modeValue} />
            <a href="#" onClick={toggleInfo} className={classes.rolloutToggle}>
              View available constants <i className={"fa fa-long-arrow-right"}></i>
            </a>
          </div>
          <div className={classes.toolboxSection}>
            <span className={classes.sectionTitle}>Rule Set</span>
            <RuleForm />
            <div className={classes.rules}>
              {rules.map((rule) => {
                return (<RuleItem key={rule.symbol} onRemove={removeRule} {...rule} />);
              })}
            </div>
          </div>
        </div>
        <div className={infoClass}>
          <div className={classes.infoContainer}>
            <div className={classes.infoSection}>
              <span className={classes.sectionTitle}>Constants</span>
              {constants.map((constant) => {
                return (<ConstantItem key={constant.symbol} {...constant} />);
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbox;
