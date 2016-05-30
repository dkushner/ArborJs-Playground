import { connect } from 'react-redux';
import { rename } from '../modules/workspace';
import Workspace from '../components/Workspace';

const mapActionCreators = { rename };

const mapStateToProps = (state) => ({
  name: state.name
});

export default connect(mapStateToProps, mapActionCreators)(Workspace);
