import { connect } from 'react-redux';
import { 
  addRule, 
  toggleRule,
  toggleConstant,
  setPredecessor,
  removeRule, 
  setRenderMode, 
  toggleInfo 
} from '../modules/toolbox';
import Toolbox from '../components/Toolbox';

const mapActionCreators = {
  addRule,
  toggleRule,
  toggleConstant,
  setPredecessor,
  removeRule,
  setRenderMode,
  toggleInfo
};

const mapStateToProps = (state) => ({
  constants: state.toolbox.constants,
  rules: state.toolbox.rules,
  open: state.toolbox.open,
  mode: state.toolbox.mode
});

export default connect(mapStateToProps, mapActionCreators)(Toolbox);

