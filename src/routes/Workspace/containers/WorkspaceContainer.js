import { connect } from 'react-redux';
import { rename, addError } from '../modules/workspace';
import { setDimensions } from '../modules/stage';
import Workspace from '../components/Workspace';

const mapActionCreators = { 
  rename,
  addError,
  setDimensions
};

const mapStateToProps = (state) => ({
  name: state.workspace.name,
  errors: state.workspace.errors
});

export default connect(mapStateToProps, mapActionCreators)(Workspace);
