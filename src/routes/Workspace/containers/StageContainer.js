import { connect } from 'react-redux';
import { setPoints, setDimensions } from '../modules/stage';
import Stage from '../components/Stage';

const mapActionCreators = {
  setPoints,
  setDimensions
};

const mapStateToProps = (state) => ({
  points: state.stage.points,
  width: state.stage.width,
  height: state.stage.height
});

export default connect(mapStateToProps, mapActionCreators)(Stage);
