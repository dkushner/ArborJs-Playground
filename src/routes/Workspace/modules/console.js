export const EXECUTE_COMMAND = 'EXECUTE_COMMAND';
export const INSERT_CHARACTER = 'INSERT_CHARACTER';
export const ERASE_CHARACTER = 'ERASE_CHARACTER';
export const DELETE_CHARACTER = 'DELETE_CHARACTER';
export const MOVE_CURSOR = 'MOVE_CURSOR';
export const APPEND_OUTPUT = 'APPEND_OUTPUT';
export const CLEAR_SCREEN = 'CLEAR_SCREEN';

/** Utility Functions **/
const COMMANDS = {
  run: (axiom) => {

  }
};

/** Action Creators **/
export function insertCharacter(character) {
  return { type: INSERT_CHARACTER, character };
}

export function moveCursor(line, column) {
  return { type: MOVE_CURSOR, line, column };
}

export function eraseCharacter() {
  return { type: ERASE_CHARACTER };
}

export function deleteCharacter() {
  return { type: DELETE_CHARACTER };
}

export function executeCommand() {
  return { type: EXECUTE_COMMAND };
}

export function appendOutput(lines) {
  return { type: APPEND_OUTPUT, lines };
}

export function clearScreen() {
  return { type: CLEAR_SCREEN };
}

export const actions = {
  insertCharacter,
  eraseCharacter,
  deleteCharacter,
  moveCursor,
  executeCommand,
  appendOutput,
  clearScreen
};

const ACTION_HANDLERS = {
  [INSERT_CHARACTER]: (state, action) => {
    const { command, history, cursor } = state;
    const { character } = action;

    const source = (cursor.line) ? history[cursor.line - 1] : command;
    const pointer = { line: 0, column: cursor.column + 1 };

    const updated = [
      ...source.slice(0, cursor.column),
      character,
      ...source.slice(cursor.column)
    ].join('');

    return { ...state, command: updated, cursor: pointer };
  },
  [ERASE_CHARACTER]: (state, action) => {
    const { command, history, cursor } = state;
    const { character } = action;

    const source = (cursor.line) ? history[cursor.line - 1] : command;
    const pointer = { line: 0, column: (cursor.column) ? cursor.column - 1 : 0 };

    const updated = [
      ...source.slice(0, cursor.column - 1),
      ...source.slice(cursor.column)
    ].join('');

    return { ...state, command: updated, cursor: pointer };
  },
  [DELETE_CHARACTER]: (state, action) => {
    const { command, history, cursor } = state;
    const { character } = action;

    const source = (cursor.line) ? history[cursor.line - 1] : command;
    const pointer = { line: 0, column: cursor.column };

    const updated = [
      ...source.slice(0, cursor.column),
      ...source.slice(cursor.column + 1)
    ].join('');

    return { ...state, command: updated, cursor: pointer };
  },
  [MOVE_CURSOR]: (state, action) => {
    const { cursor, history, command } = state;
    const { line, column } = action;

    let pointer = { ...cursor };

    if (line < 0 && cursor.line > 0) {
      pointer.line = pointer.line - 1;
    } 

    if (line > 0 && cursor.line <= history.length) {
      pointer.line = pointer.line + 1;
    }

    if (column < 0 && cursor.column > 0) {
      pointer.column = pointer.column - 1;
    }

    if (column > 0 && cursor.column <= command.length) {
      pointer.column = pointer.column + 1;
    }

    return {
      ...state,
      cursor: pointer,
      command: (pointer.line) ? history[pointer.line] : command
    };
  }
};

const initialState = {
  command: "",
  history: [],
  output: [],
  cursor: {
    column: 0,
    line: 0
  }
};

export default function consoleReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

