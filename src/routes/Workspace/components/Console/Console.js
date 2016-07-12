import React, { PropTypes } from 'react';
import classes from './Console.scss';

class Console extends React.Component {
  static propTypes = {
    command: PropTypes.string.isRequired,
    history: PropTypes.array.isRequired,
    output: PropTypes.array.isRequired,
    cursor: PropTypes.shape({
      line: PropTypes.number.isRequired,
      column: PropTypes.number.isRequired
    }).isRequired
  };

  handleInput(event) {
    event.preventDefault();
    const { command, cursor } = this.props;
    const { insertCharacter, moveCursor, eraseCharacter, executeCommand } = this.props;
    switch (event.key) {
      case 'ArrowLeft':
        moveCursor(0, -1);
        break;
      case 'ArrowUp':
        moveCursor(1, 0);
        break;
      case 'ArrowRight':
        moveCursor(0, 1);
        break;
      case 'ArrowDown':
        moveCursor(-1, 0);
        break;
      case 'Backspace':
        eraseCharacter();
        break;
      case 'Enter':
        executeCommand();
        break;
      default:
        insertCharacter(event.key);
        break;
    }
  }

  render() {
    const { command, history, output, cursor } = this.props;

    const prefix = command.slice(0, cursor.column);
    const suffix = command.slice(cursor.column + 1);

    return (
      <div className={classes.container}>
        <div className={classes.buffer}>
        </div>
        <div className={classes.prompt}>
          {prefix}
          <input type="text" 
                 ref="prompt" 
                 value={command[cursor.column]}
                 className={classes.cursor} 
                 onKeyPress={(e) => e.preventDefault()}
                 onKeyUp={this.handleInput.bind(this)} />
          {suffix}
        </div>
      </div>
    );
  }
}

export default Console;
