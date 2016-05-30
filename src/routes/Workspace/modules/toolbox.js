export const ADD_RULE = 'ADD_RULE';
export const REMOVE_RULE = 'REMOVE_RULE';

export function addRule(rule) {
  return { type: ADD_RULE, rule };
}

export function removeRule(rule) {
  return { type: REMOVE_RULE, rule };
}

export const actions = { 
  addRule,
  removeRule
};

const ACTION_HANDLERS = {
  [ADD_RULE]: (state, action) => {
    const rule = action.rule;

    return { 
      ...state, 
      rules: {
        ...state.rules,
        [rule.symbol]: rule
      }
    };
  },
  [REMOVE_RULE]: (state, action) => {
    const rule = action.rule;

    const rules = Object.assign({}, state.rules);
    delete rules[action.rule.symbol];

    return { ...state, rules };
  }
};

const initialState = {
  constants: {},
  rules: {}
};

export default function toolboxReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
