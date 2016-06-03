import { connect } from 'react-redux';
import { setTrack, setPlayback, setAxiom } from '../modules/scrub';
import Scrub from '../components/Scrub';

const mapActionCreators = {
  setTrack,
  setPlayback,
  setAxiom
};

const mapStateToProps = (state) => ({
  position: state.scrub.position,
  mode: state.scrub.mode,
  axiom: state.scrub.axiom
});

export default connect(mapStateToProps, mapActionCreators)(Scrub);


