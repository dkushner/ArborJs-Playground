import Arbor from 'arborjs';
import _ from 'lodash';

export const ADD_RULE = 'ADD_RULE';
export const REMOVE_RULE = 'REMOVE_RULE';
export const TOGGLE_RULE = 'TOGGLE_RULE';
export const TOGGLE_CONSTANT = 'TOGGLE_CONSTANT';
export const SET_PREDECESSOR = 'SET_PREDECESSOR';
export const SET_RENDER_MODE = 'SET_RENDER_MODE';
export const TOGGLE_INFO = 'TOGGLE_INFO';

/* Action Definitions */
export function addRule() {
  return { 
    type: ADD_RULE, 
    ruleId: _.uniqueId("rule")
  };
}

export function setPredecessor(ruleId, value) {
  return { type: SET_PREDECESSOR, ruleId, value };
}

export function toggleRule(ruleId) {
  return { type: TOGGLE_RULE, ruleId };
}

export function toggleConstant(constantId) {
  return { type: TOGGLE_CONSTANT, constantId };
}

export function removeRule(ruleId) {
  return { type: REMOVE_RULE, ruleId };
}

export function setRenderMode(mode) {
  return { type: SET_RENDER_MODE, mode };
}

export function toggleInfo() {
  return { type: TOGGLE_INFO };
}

export const actions = { 
  addRule,
  setPredecessor,
  toggleRule,
  toggleConstant,
  removeRule,
  setRenderMode,
  toggleInfo
};

/* Action Handlers */
const ACTION_HANDLERS = {
  [SET_PREDECESSOR]: (state, action) => {
    const { ruleId, value } = action;
    const { rules } = state;

    const ruleIndex = rules.findIndex(rule => rule.ruleId == ruleId);
    const rule = Object.assign({}, rules[ruleIndex]);
    rule.predecessor.value = value;

    return {
      ...state,
      rules: [
        ...rules.slice(0, ruleIndex),
        rule,
        ...rules.slice(ruleIndex + 1)
      ]
    };
  },
  [TOGGLE_CONSTANT]: (state, action) => {
    const { constantId } = action;
    const { constants } = state;

    const constantIndex = constants.findIndex(constant => constant.constantId == constantId);
    const constant = {
      ...constants[constantIndex],
      open: !constants[constantIndex].open
    };

    return {
      ...state,
      constants: [
        ...constants.slice(0, constantIndex),
        constant,
        ...constants.slice(constantIndex + 1)
      ]
    };
  },
  [TOGGLE_RULE]: (state, action) => {
    const { ruleId } = action;

    const ruleIndex = state.rules.findIndex(rule => rule.ruleId == ruleId);
    const rule = {
      ...state.rules[ruleIndex],
      open: !state.rules[ruleIndex].open
    };

    return {
      ...state,
      rules: [
        ...state.rules.slice(0, ruleIndex),
        rule,
        ...state.rules.slice(ruleIndex + 1)
      ]
    };
  },
  [ADD_RULE]: (state, action) => {
    const rule = { 
      ruleId: action.ruleId,
      open: false,
      predecessor: {
        value: ""
      },
      productions: []
    };

    return { 
      ...state, 
      rules: [...state.rules, rule]
    };
  },
  [REMOVE_RULE]: (state, action) => {
    const { ruleId } = action;

    const ruleIndex = state.rules.findIndex(rule => rule.ruleId == ruleId);

    return { 
      ...state,
      rules: [
        ...state.rules.slice(0, ruleIndex),
        ...state.rules.slice(ruleIndex + 1)
      ]
    };
  },
  [SET_RENDER_MODE]: (state, action) => {
    const mode = action.mode;
    return { 
      ...state, 
      mode,
      constants: [...CONSTANTS[mode]].map(constant => {
        return {
          ...constant,
          constantId: _.uniqueId("constant"),
          open: false
        };
      })
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
  }].map(constant => ({
    ...constant,
    constantId: _.uniqueId("constant"),
    open: false
  })),
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
  }].map(constant => ({
    ...constant,
    constantId: _.uniqueId("constant"),
    open: false
  })),
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
  }].map(constant => ({ 
    ...constant, 
    constantId: _.uniqueId("constant"),
    open: false
  }))
};


const initialState = {
  rules: [],
  constants: [...CONSTANTS[RenderMode.SPLINE]],
  open: false,
  mode: RenderMode.SPLINE
};

export default function toolboxReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
