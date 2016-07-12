import { connect } from 'react-redux';
import { 
  executeCommand,
  insertCharacter,
  eraseCharacter,
  deleteCharacter,
  moveCursor,
  appendOutput,
  clearScreen
} from '../modules/console';
import Console from '../components/Console';

const mapActionCreators = {
  executeCommand,
  insertCharacter,
  eraseCharacter,
  deleteCharacter,
  moveCursor,
  appendOutput,
  clearScreen
};

const mapStateToProps = (state) => ({
  command: state.console.command,
  history: state.console.history,
  output: state.console.output,
  cursor: state.console.cursor
});

export default connect(mapStateToProps, mapActionCreators)(Console);
