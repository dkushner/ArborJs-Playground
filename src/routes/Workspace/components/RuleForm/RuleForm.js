import React, { PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import ContentEditable from 'react-contenteditable';
import { addRule } from '../../modules/toolbox';
import classes from './RuleForm.scss';
import Arbor from 'arborjs';

const validate = (form) => {
  const errors = {};

  if (!form.predecessor) {
    errors.predecessor = "Must define a valid predecessor.";
  }

  return errors;
};

class RuleForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  };

  validate(form) {
    const errors = {};

    if (!form.predecessor) {
      errors.predecessor = "Must define a valid predecessor.";
    }

    return errors;
  }

  submit(values, dispatch) {
    const { predecessor, production } = values;
    const arglist = /\(\s*([^)]+?)\s*\)/.exec(predecessor);

    if (arglist && arglist[1]) {
      let args = arglist[1].replace(/ /g, '').split(',');
      dispatch(addRule({
        symbol: predecessor[0],
        parameters: args,
        predecessor,
        production: production || predecessor
      }));
    } else {
      dispatch(addRule({
        symbol: predecessor[0],
        parameters: [],
        predecessor,
        production: production || predecessor
      }));
    }

    dispatch(reset('rule'));
  }

  handleChange(field, event) {
    this.props.fields[field].onChange(event.target.textContent);
  }

  render() {
    const { fields: { predecessor, production }, handleSubmit } = this.props;

    const handlePredecessor = this.handleChange.bind(this, 'predecessor');
    const handleProduction = this.handleChange.bind(this, 'production');

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div className={classes.container}>
          <div className={classes.fieldset}>
            <div className={classes.fieldGroup}>
              <div className={classes.label}>Predecessor</div>
              <div className={classes.field} 
                   onInput={handlePredecessor} 
                   onBlur={handlePredecessor}
                   contentEditable>
                {predecessor.value || ''}
              </div>
            </div>
            <div className={classes.fieldGroup}>
              <div className={classes.label}>Production</div>
              <div className={classes.field} 
                   onInput={handleProduction}
                   onBlur={handleProduction}
                   contentEditable>
                {production.value || ''}
              </div>
            </div>
            <input type="text" style={{ display: "none" }} {...predecessor} />
            <input type="text" style={{ display: "none" }} {...production} />
          </div>
          <button className={"btn btn-block btn-sm btn-primary"}>Submit</button>
        </div>
      </form>
    );
  }
}

RuleForm = reduxForm({
  form: 'rule',
  fields: ['predecessor', 'production'],
  validate
})(RuleForm);

export default RuleForm;

