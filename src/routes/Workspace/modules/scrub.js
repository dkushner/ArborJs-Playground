export const SET_TRACK = 'SET_TRACK';
export const SET_PLAYBACK = 'SET_PLAYBACK';
export const SET_AXIOM = 'SET_AXIOM';

export function setTrack(position) {
  return { type: SET_TRACK, position };
}

export function setPlayback(mode) {
  return { type: SET_PLAYBACK, mode };
}

export function setAxiom(axiom) {
  return { type: SET_AXIOM, axiom };
}

export const actions = {
  setTrack,
  setPlayback,
  setAxiom
};

const ACTION_HANDLERS = {
  [SET_TRACK]: (state, action) => { 
    return { ...state, position: action.position };
  },
  [SET_PLAYBACK]: (state, action) => { 
    return { ...state, mode: action.mode };
  },
  [SET_AXIOM]: (state, action) => {
    return { ...state, axiom: action.axiom };
  }
};

const initialState = {
  position: 0.0,
  mode: 'STOP',
  axiom: ''
};

export default function scrubReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
