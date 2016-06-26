import Arbor from 'arborjs';
import _ from 'lodash';

export const ADD_RULE = 'ADD_RULE';
export const UPDATE_RULE = 'UPDATE_RULE';
export const TOGGLE_EDIT = 'TOGGLE_EDIT';
export const REMOVE_RULE = 'REMOVE_RULE';
export const SET_RENDER_MODE = 'SET_RENDER_MODE';
export const TOGGLE_INFO = 'TOGGLE_INFO';

/* Utility Functions */

/* Action Definitions */
export function addRule() {
  return { 
    type: ADD_RULE, 
    ruleId: _.uniqueId("rule")
  };
}

export function updateRule(ruleId, predecessor, production) {
  return { type: UPDATE_RULE, ruleId, predecessor, production };
}

export function toggleEdit(ruleId, part) {
  return { type: TOGGLE_EDIT, ruleId, part };
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
  updateRule,
  toggleEdit,
  removeRule,
  setRenderMode,
  toggleInfo
};

/* Action Handlers */
const ACTION_HANDLERS = {
  [UPDATE_RULE]: (state, action) => {
    const { ruleId , predecessor, production } = action;
    const rules = [...state.rules]; 

    const rule = rules.find(r => r.ruleId == ruleId);
    rule.predecessor.raw = predecessor.replace(/\s/g, '');
    rule.production.raw = production.replace(/\s/g, '');

    return { ...state, rules };
  },
  [TOGGLE_EDIT]: (state, action) => {
    const { ruleId, part } = action;
    const rules = [...state.rules];

    const rule = rules.find(r => r.ruleId == ruleId);
    rule[part].editing = !rule[part].editing;

    return { ...state, rules };
  },
  [ADD_RULE]: (state, action) => {
    const rule = { 
      ruleId: action.ruleId,
      predecessor: {
        raw: "",
        editing: false,
        parameters: []
      },
      production: {
        raw: "",
        editing: false,
        references: []
      }
    };

    return { 
      ...state, 
      rules: [...state.rules, rule]
    };
  },
  [REMOVE_RULE]: (state, action) => {
    const { ruleId } = action;

    const rules = state.rules.filter((existing) => {
      return existing.ruleId != ruleId;
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
    form: "!(x)",
    parameters: [{
      name: "x",
      description: "The number of units to move forward."
    }],
    description: "Moves turtle forward by the given number of units."
  }, {
    symbol: "@",
    form: "@(x, y, z)",
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
    form: "#(r, g, b)",
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
    form: "[",
    parameters: [],
    description: "Push the turtle's state onto the stack."
  }, {
    symbol: "]",
    form: "]",
    parameters: [],
    description: "Pop the turtle's state, returning it to the last." 
  }],
  [RenderMode.CURVE]: [{
    symbol: "!",
    form: "!(d)",
    parameters: [{
      name: "x",
      description: "The number of units to move forward."
    }],
    description: "Moves turtle forward by the given number of units."
  }, {
    symbol: "@",
    form: "@(x, y, z)",
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
    form: "#(r, g, b)",
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
    form: "[",
    parameters: [],
    description: "Push the turtle's state onto the stack."
  }, {
    symbol: "]",
    form: "]",
    parameters: [],
    description: "Pop the turtle's state, returning it to the last." 
  }],
  [RenderMode.TEXT]: [{
    symbol: "!",
    form: "!(d)",
    parameters: [{
      name: "x",
      description: "The number of units to move forward."
    }],
    description: "Moves turtle forward by the given number of units."
  }, {
    symbol: "@",
    form: "@(x, y, z)",
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
    form: "#(r, g, b)",
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
    form: "[",
    parameters: [],
    description: "Push the turtle's state onto the stack."
  }, {
    symbol: "]",
    form: "]",
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
