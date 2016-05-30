import { connect } from 'react-redux';
import { addRule, removeRule } from '../modules/toolbox';
import Toolbox from '../components/Toolbox';

const mapActionCreators = {
  addRule,
  removeRule
};

const mapStateToProps = (state) => ({
  constants: state.constants,
  rules: state.rules
});

export default connect(mapStateToProps, mapActionCreators)(Toolbox);

