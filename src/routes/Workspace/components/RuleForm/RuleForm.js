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

  handleAddition(values, dispatch) {
    return new Promise((resolve, reject) => {
      try {
        let rule = new Arbor.Rule(values.predecessor, values.production);

        dispatch(addRule({
          symbol: rule.symbol,
          predecessor: values.predecessor,
          production: values.production || values.predecessor
        }));

        dispatch(reset('rule'));
        resolve();
      } catch (e) {
        reject({ _error: "There was a problem." });
      }
    });
  }

  handleChange(field, event) {
    this.props.fields[field].onChange(event.target.textContent);
  }

  render() {
    const { fields: { predecessor, production }, handleSubmit } = this.props;

    const handlePredecessor = this.handleChange.bind(this, 'predecessor');
    const handleProduction = this.handleChange.bind(this, 'production');

    return (
      <form onSubmit={handleSubmit(this.handleAddition.bind(this))}>
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

