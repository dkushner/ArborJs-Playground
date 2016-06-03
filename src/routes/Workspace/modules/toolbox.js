import Arbor from 'arborjs';

export const ADD_RULE = 'ADD_RULE';
export const REMOVE_RULE = 'REMOVE_RULE';
export const SET_RENDER_MODE = 'SET_RENDER_MODE';

export function addRule(rule) {
  return { type: ADD_RULE, rule };
}

export function removeRule(rule) {
  return { type: REMOVE_RULE, rule };
}

export function setRenderMode(mode) {
  return { type: SET_RENDER_MODE, mode };
}

export const actions = { 
  addRule,
  removeRule,
  setRenderMode
};

const ACTION_HANDLERS = {
  [ADD_RULE]: (state, action) => {
    const rule = action.rule;
    const rules = state.rules.filter((existing) => {
      return existing.symbol != rule.symbol;
    });

    console.log(rules, rule);

    return { 
      ...state, 
      rules: [...rules, rule]
    };
  },
  [REMOVE_RULE]: (state, action) => {
    const rule = action.rule;
    const rules = state.rules.filter((existing) => {
      return existing.symbol != rule.symbol;
    });

    return { ...state, rules };
  },
  [SET_RENDER_MODE]: (state, action) => {
    const mode = action.mode;
    return { 
      ...state, 
      mode,
      grammar: RENDER_MODES[mode].grammar,
      constants: RENDER_MODES[mode].constants
    };
  }
};

export const SPLINE = "SPLINE";
export const CURVE = "CURVE";
export const TEXT = "TEXT";

const RENDER_MODES = {
  [SPLINE]: {
    get grammar() {
      let grammar = new Arbor.Grammar();
      grammar.addRule("!(x)");
      grammar.addRule("@(x, y, z)");
      grammar.addRule("#(r, g, b, a)");
      grammar.addRule("[");
      grammar.addRule("]");
      return grammar;
    },
    constants: [{
      form: "!(x)",
      description: "Moves the turtle forward by x units."
    }, {
      form: "@(x, y, z)",
      description: "Rotates the turtle by x, y and z degrees about each axis."
    }, {
      form: "#(r, g, b, a)",
      description: "Changes the active line color for the turtle." 
    }, {
      form: "[",
      description: "Push the turtle's state onto the stack."
    }, {
      form: "]",
      description: "Pop the turtle's state, returning it to the last." 
    }]
  },
  [CURVE]: {
    get grammar() {
      let grammar = new Arbor.Grammar();
      grammar.addRule("!(x)");
      grammar.addRule("@(x, y, z)");
      grammar.addRule("#(r, g, b, a)");
      grammar.addRule("[");
      grammar.addRule("]");
      return grammar;
    },
    constants: [{
      form: "!(x)",
      description: "Moves the turtle forward by x units."
    }, {
      form: "@(x)",
      description: "Rotates the turtle by x, y and z degrees about each axis."
    }, {
      form: "#(r, g, b, a)",
      description: "Changes the active line color for the turtle." 
    }, {
      form: "[",
      description: "Push the turtle's state onto the stack."
    }, {
      form: "]",
      description: "Pop the turtle's state, returning it to the last." 
    }]
  },
  [TEXT]: {
    get grammar() {
      let grammar = new Arbor.Grammar();
      grammar.addRule("!(x)");
      grammar.addRule("@(x, y, z)");
      grammar.addRule("#(r, g, b, a)");
      grammar.addRule("[");
      grammar.addRule("]");
      return grammar;
    },
    constants: [{
      form: "!(x)",
      description: "Moves the turtle forward by x units."
    }, {
      form: "@(x)",
      description: "Rotates the turtle by x, y and z degrees about each axis."
    }, {
      form: "#(r, g, b, a)",
      description: "Changes the active line color for the turtle." 
    }, {
      form: "[",
      description: "Push the turtle's state onto the stack."
    }, {
      form: "]",
      description: "Pop the turtle's state, returning it to the last." 
    }]
  }
};


const initialState = {
  rules: [],
  grammar: RENDER_MODES.SPLINE.grammar,
  constants: RENDER_MODES.SPLINE.constants,
  mode: "spline"
};

export default function toolboxReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
