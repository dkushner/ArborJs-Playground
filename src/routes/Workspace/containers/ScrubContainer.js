import { connect } from 'react-redux';
import { setTrack, togglePlayback, setAxiom } from '../modules/scrub';
import Scrub from '../components/Scrub';

const mapActionCreators = {
  setTrack,
  togglePlayback,
  setAxiom
};

const mapStateToProps = (state) => ({
  position: state.scrub.position,
  playing: state.scrub.playing,
  axiom: state.scrub.axiom
});

export default connect(mapStateToProps, mapActionCreators)(Scrub);


