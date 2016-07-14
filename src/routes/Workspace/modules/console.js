import { setPoints } from './stage';
import { addRule } from './workspace';
import { Grammar, Turtle3D } from 'arborjs';

export const EXECUTE_COMMAND = 'EXECUTE_COMMAND';
export const INSERT_CHARACTER = 'INSERT_CHARACTER';
export const ERASE_CHARACTER = 'ERASE_CHARACTER';
export const APPEND_HISTORY = 'APPEND_HISTORY';
export const RESET_COMMAND = 'RESET_COMMAND';
export const DELETE_CHARACTER = 'DELETE_CHARACTER';
export const MOVE_CURSOR = 'MOVE_CURSOR';
export const APPEND_OUTPUT = 'APPEND_OUTPUT';
export const CLEAR_SCREEN = 'CLEAR_SCREEN';

/** Utility Functions **/

// TODO: Stop doing so much parsing, implement this kind of deduction in the 
// library.
function parseDefinition(definition) {
  const groups = definition.match(/(\{[^\{\}]*\})+?/g);
  if (groups) {
    return groups.reduce((set, group) => {
      const [condition, output] = group.slice(1, -1).split('|');
      if (!condition || !output) {
        return set;
      }

      const numeric = parseFloat(condition);
      if (Number.isNaN(numeric)) {
        return [...set, { when: condition }];
      } else {
        return [...set, { chance: numeric }];
      }
    }, []);
  } else {
    return definition;
  }
}

const COMMANDS = {
  run: (args, dispatch, getState) => {
    const { workspace: { rules }} = getState();
    const [ axiom, iterations ] = args.split(' ');

    const grammar = new Grammar();
    // TODO: Replace this with default rules sourced from the mode.
    grammar.addRule("#(x, y, z)");
    grammar.addRule("!(x)");
    grammar.addRule("@(x, y, z)");
    grammar.addRule("[");
    grammar.addRule("]");

    Object.entries(rules).forEach(([symbol, definition]) => {
      grammar.addRule(symbol, definition)
    });

    console.log(axiom, args);
    const result = grammar.evaluate(axiom, parseFloat(iterations) || 1);

    const turtle = new Turtle3D();
    const points = turtle.consume(grammar.tokenize(result));

    dispatch(setPoints(points));
  },
  learn: (args, dispatch, getState) => {
    // Condense and deconstruct formal rule definition.
    const [predecessor, definition] = args.replace(/\s/g, '').split("=>");
    const [, symbol, arglist] = predecessor.match(/^(\S)(?:\((.*)\))?/);
    const parameters = arglist.split(',');

    const production = parseDefinition(definition);

    if (!production) {
      dispatch(appendOutput(`There was a problem parsing the rule definition: ${definition}.`));
    } else {
      dispatch(addRule(symbol, { parameters, production }));
    }
  }
};

/** Action Creators **/
export function insertCharacter(character) {
  return { type: INSERT_CHARACTER, character };
}

export function moveCursor(line, column) {
  return { type: MOVE_CURSOR, line, column };
}

export function resetCommand() {
  return { type: RESET_COMMAND };
}

export function eraseCharacter() {
  return { type: ERASE_CHARACTER };
}

export function deleteCharacter() {
  return { type: DELETE_CHARACTER };
}

export function appendHistory(command) {
  return { type: APPEND_HISTORY, command };
}

export function executeCommand() {
  return (dispatch, getState) => {
    const { console: { command } } = getState();

    dispatch(appendOutput(">> " + command));
    dispatch(appendHistory(command));

    const program = command.split(" ", 1)[0];
    const arglist = command.slice(program.length).trim();

    const handler = COMMANDS[program];

    if (handler) {
      handler(arglist, dispatch, getState);
    } else {
      dispatch(appendOutput(`Sorry, I don't know that command. Use 'help' to find out what I know.`));
    }

    dispatch(appendOutput("\n"));
    dispatch(resetCommand());
  };
}

export function appendOutput(block) {
  return { type: APPEND_OUTPUT, block };
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
  [RESET_COMMAND]: (state, action) => {
    const cursor = { column: 0, line: 0 };
    return { ...state, cursor, command: "" };
  },
  [MOVE_CURSOR]: (state, action) => {
    const { cursor, history, command } = state;
    const { line, column } = action;

    let pointer = { ...cursor };

    console.log(line, column, history);
    if (line < 0 && cursor.line > 0) {
      console.log(1);
      pointer.line = pointer.line - 1;
    } 

    if (line > 0 && cursor.line < history.length) {
      pointer.line = pointer.line + 1;
    }

    if (column < 0 && cursor.column > 0) {
      console.log(3);
      pointer.column = pointer.column - 1;
    }

    if (column > 0 && cursor.column <= command.length) {
      console.log(4);
      pointer.column = pointer.column + 1;
    }

    console.log(pointer);
    return {
      ...state,
      cursor: pointer,
      command: (pointer.line) ? history[pointer.line - 1] : command
    };
  },
  [APPEND_OUTPUT]: (state, action) => {
    const { block } = action;

    return {
      ...state,
      output: [ ...state.output, block ]
    };
  },
  [APPEND_HISTORY]: (state, action) => {
    const { command } = action;

    return {
      ...state,
      history: [
        command,
        ...state.history
      ]
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

