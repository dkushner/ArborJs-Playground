import Arbor from 'arborjs';

export const ADD_RULE = 'ADD_RULE';
export const REMOVE_RULE = 'REMOVE_RULE';
export const SET_RENDER_MODE = 'SET_RENDER_MODE';
export const TOGGLE_INFO = 'TOGGLE_INFO';

export function addRule(rule) {
  return { type: ADD_RULE, rule };
}

export function removeRule(rule) {
  return { type: REMOVE_RULE, rule };
}

export function setRenderMode(mode) {
  return { type: SET_RENDER_MODE, mode };
}

export function toggleInfo() {
  return { type: TOGGLE_INFO };
}

export const actions = { 
  addRule,
  removeRule,
  setRenderMode,
  toggleInfo
};

const ACTION_HANDLERS = {
  [ADD_RULE]: (state, action) => {
    const rule = action.rule;
    const rules = state.rules.filter((existing) => {
      return existing.symbol != rule.symbol;
    });

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
      constants: CONSTANTS[mode]
    };
  },
  [TOGGLE_INFO]: (state, action) => {
    return {
      ...state,
      open: !state.open
    };
  }
};

export const RenderMode = {
  SPLINE: "SPLINE",
  CURVE: "CURVE",
  TEXT: "TEXT"
};

const CONSTANTS = {
  [RenderMode.SPLINE]: [{
    symbol: "!",
    parameters: [{
      name: "x",
      description: "The number of units to move forward."
    }],
    description: "Moves turtle forward by the given number of units."
  }, {
    symbol: "@",
    parameters: [{
      name: "x",
      description: "Degree of rotation about X axis."
    }, {
      name: "y",
      description: "Degree of rotation about Y axis."
    }, {
      name: "z",
      description: "Degree of rotation about Z axis."
    }],
    description: "Rotates the orientation of the turtle in three dimensions."
  }, {
    symbol: "#",
    parameters: [{
      name: "r",
      description: "The red value of the desired color."
    }, {
      name: "g",
      description: "The green value of the desired color."
    }, {
      name: "b",
      description: "The blue value of the desired color."
    }],
    description: "Changes the active line color." 
  }, {
    symbol: "[",
    parameters: [],
    description: "Push the turtle's state onto the stack."
  }, {
    symbol: "]",
    parameters: [],
    description: "Pop the turtle's state, returning it to the last." 
  }],
  [RenderMode.CURVE]: [{
    symbol: "!",
    parameters: [{
      name: "x",
      description: "The number of units to move forward."
    }],
    description: "Moves turtle forward by the given number of units."
  }, {
    symbol: "@",
    parameters: [{
      name: "x",
      description: "Degree of rotation about X axis."
    }, {
      name: "y",
      description: "Degree of rotation about Y axis."
    }, {
      name: "z",
      description: "Degree of rotation about Z axis."
    }],
    description: "Rotates the orientation of the turtle in three dimensions."
  }, {
    symbol: "#",
    parameters: [{
      name: "r",
      description: "The red value of the desired color."
    }, {
      name: "g",
      description: "The green value of the desired color."
    }, {
      name: "b",
      description: "The blue value of the desired color."
    }],
    description: "Changes the active line color." 
  }, {
    symbol: "[",
    parameters: [],
    description: "Push the turtle's state onto the stack."
  }, {
    symbol: "]",
    parameters: [],
    description: "Pop the turtle's state, returning it to the last." 
  }],
  [RenderMode.TEXT]: [{
    symbol: "!",
    parameters: [{
      name: "x",
      description: "The number of units to move forward."
    }],
    description: "Moves turtle forward by the given number of units."
  }, {
    symbol: "@",
    parameters: [{
      name: "x",
      description: "Degree of rotation about X axis."
    }, {
      name: "y",
      description: "Degree of rotation about Y axis."
    }, {
      name: "z",
      description: "Degree of rotation about Z axis."
    }],
    description: "Rotates the orientation of the turtle in three dimensions."
  }, {
    symbol: "#",
    parameters: [{
      name: "r",
      description: "The red value of the desired color."
    }, {
      name: "g",
      description: "The green value of the desired color."
    }, {
      name: "b",
      description: "The blue value of the desired color."
    }],
    description: "Changes the active line color." 
  }, {
    symbol: "[",
    parameters: [],
    description: "Push the turtle's state onto the stack."
  }, {
    symbol: "]",
    parameters: [],
    description: "Pop the turtle's state, returning it to the last." 
  }],
};


const initialState = {
  rules: [],
  constants: CONSTANTS[RenderMode.SPLINE],
  open: false,
  mode: RenderMode.SPLINE
};

export default function toolboxReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
