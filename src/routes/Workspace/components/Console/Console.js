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

  handleKeyDown(event) {
    event.preventDefault();

    const { insertCharacter, eraseCharacter, moveCursor, executeCommand } = this.props;

    if (event.key.length === 1) {
      insertCharacter(event.key);
      return;
    }

    switch (event.key) {
      case 'Backspace':
        eraseCharacter();
        break;
      case 'ArrowLeft':
        moveCursor(0, -1);
        break;
      case 'ArrowRight':
        moveCursor(0, 1);
        break;
      case 'ArrowUp':
        moveCursor(1, 0);
        break;
      case 'ArrowDown':
        moveCursor(-1, 0);
        break;
      case 'Enter':
        executeCommand();
        break;
      default: break;
    }
  }

  componentDidUpdate() {
    this.refs.buffer.scrollTop = this.refs.buffer.scrollHeight;
  }

  render() {
    const { command, history, output, cursor } = this.props;

    const prefix = command.slice(0, cursor.column);
    const suffix = command.slice(cursor.column + 1);

    return (
      <div className={classes.container}>
        <div className={classes.buffer} ref="buffer">
          {output.map((line, index) => {
            return (<p key={index}>{line}</p>);
          })}
        </div>
        <div className={classes.prompt}>
          >>&nbsp;
          <span>{prefix}</span>
          <span className={classes.cursor} 
                ref="prompt" 
                onKeyDown={this.handleKeyDown.bind(this)}
                contentEditable>
            {command[cursor.column]}
          </span>
          <span>{suffix}</span>
        </div>
      </div>
    );
  }
}

export default Console;
