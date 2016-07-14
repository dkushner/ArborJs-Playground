export const ADD_RULE = 'ADD_RULE';
export const RENAME_WORKSPACE = 'RENAME_WORKSPACE';

export function defineRule(symbol, definition) {
  return { type: DEFINE_RULE, definition };
}

export function addRule(symbol, definition) {
  return { type: ADD_RULE, symbol, definition };
}

export function rename(name) {
  return { type: RENAME_WORKSPACE, name };
}

export const actions = { 
  rename,
  addRule
};

const ACTION_HANDLERS = {
  [RENAME_WORKSPACE]: (state, action) => {
    return { ...state, name: action.name };
  },
  [ADD_RULE]: (state, action) => {
    const { rules } = state;
    const { symbol, definition } = action;

    return {
      ...state,
      rules: {
        ...state.rules,
        [symbol]: definition
      }
    };
  }
};

const initialState = {
  name: "Unnamed Workspace",
  rules: {}
};

export default function workspaceReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
