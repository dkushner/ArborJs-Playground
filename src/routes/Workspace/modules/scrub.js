import Arbor from 'arborjs';
import { setPoints } from './stage';
import { addError } from './workspace';
import { actions as notif } from 're-notif';

export const SET_TRACK = 'SET_TRACK';
export const TOGGLE_PLAYBACK = 'TOGGLE_PLAYBACK';
export const SET_PLAYBACK = 'SET_PLAYBACK';
export const SET_AXIOM = 'SET_AXIOM';

/** Private Actions **/
function setPlayback(playing) {
  return { type: SET_PLAYBACK, playing };
}

function evaluateAxiom(axiom, rules, constants) {
  return new Promise((resolve, reject) => {
    if (!axiom) {
      return reject("No axiom is set.");
    } 

    const grammar = new Arbor.Grammar();
    _.each(rules, (rule) => {
      grammar.addRule(new Arbor.Rule(rule.predecessor, rule.production));
    });

    _.each(constants, (constant) => {
      grammar.addRule(new Arbor.Rule(constant.form));
    });

    const expanded = grammar.interpret(axiom, 1000);
    const turtle = new Arbor.Turtle3D();
    resolve(turtle.consume(expanded));
  });
}

/** Action Creators **/
export function setTrack(position) {
  return { type: SET_TRACK, position };
}

export function togglePlayback() {
  return (dispatch, getState) => {
    const { 
      scrub: { axiom, playing },
      toolbox: { rules, constants }
    } = getState();

    if (playing) {
      return dispatch(setPlayback(!playing));
    } else {
      return evaluateAxiom(axiom, rules, constants).then((points) => {
        dispatch(setPoints(points));
      }).then(() => {
        dispatch(setPlayback(true));
      }).catch((err) => {
        dispatch(notif.notifSend({
          message: err.stack || err,
          kind: 'danger',
          dismissAfter: 2000
        }));
      });
    }
  };
}

export function setAxiom(axiom) {
  return { type: SET_AXIOM, axiom };
}

export const actions = {
  setTrack,
  togglePlayback,
  setAxiom
};

/** Action Handlers **/
const ACTION_HANDLERS = {
  [SET_TRACK]: (state, action) => { 
    return { ...state, position: action.position };
  },
  [SET_PLAYBACK]: (state, action) => { 
    return { ...state, playing: action.playing };
  },
  [SET_AXIOM]: (state, action) => {
    return { ...state, axiom: action.axiom };
  }
};

const initialState = {
  position: 0.0,
  playing: false,
  axiom: ''
};

export default function scrubReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
