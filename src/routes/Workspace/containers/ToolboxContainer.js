import { connect } from 'react-redux';
import { addRule, removeRule, setRenderMode } from '../modules/toolbox';
import Toolbox from '../components/Toolbox';

const mapActionCreators = {
  addRule,
  removeRule,
  setRenderMode
};

const mapStateToProps = (state) => ({
  constants: state.toolbox.constants,
  rules: state.toolbox.rules,
  grammar: state.toolbox.grammar,
  mode: state.toolbox.mode
});

export default connect(mapStateToProps, mapActionCreators)(Toolbox);

