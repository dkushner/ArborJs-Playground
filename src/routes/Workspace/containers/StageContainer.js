import { connect } from 'react-redux';
import { setPoints, setDimensions } from '../modules/stage';
import Stage from '../components/Stage';

const mapActionCreators = {
  setPoints,
  setDimensions
};

const mapStateToProps = (state) => ({
  points: state.stage.points,
  width: state.browser.width,
  height: state.browser.height
});

export default connect(mapStateToProps, mapActionCreators)(Stage);
