import React, { PropTypes } from 'react';
import classes from './Toolbox.scss';
import classNames from 'classnames';
import { RenderMode } from '../../modules/toolbox';
import Dropdown from 'react-dropdown';
import Rule from '../Rule';
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
    const { 
      addRule, 
      setPredecessor,
      toggleRule,
      removeRule, 
      setRenderMode, 
      toggleInfo 
    } = this.props;

    const infoClass = classNames(classes.info, { [classes.open]: open });

    const modeOptions = [
      { value: RenderMode.SPLINE, label: "Spline" },
      { value: RenderMode.CURVE, label: "Curve" },
      { value: RenderMode.TEXT, label: "Text" }
    ];

    const ruleActions = {
      toggleRule,
      removeRule,
      setPredecessor
    };

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
            <div className={classes.rules}>
              {rules.map((rule) => {
                return (
                  <Rule key={rule.ruleId} 
                        {...ruleActions}
                        {...rule} />
                );
              })}
            </div>
            <a className={classes.addRule} href="#" onClick={addRule}>
              <i className={"fa fa-plus-square-o"} />
              <span>Add a new rule</span>
            </a>
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
