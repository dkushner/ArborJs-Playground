export const SET_POINTS = 'SET_POINTS';
export const SET_DIMENSIONS = 'SET_DIMENSIONS';

export function setPoints(points) {
  return { type: SET_POINTS, points };
}

export function setDimensions(width, height) {
  return { type: SET_DIMENSIONS, width, height };
}

export const actions = {
  setPoints,
  setDimensions
};

const ACTION_HANDLERS = {
  [SET_POINTS]: (state, action) => {
    return { ...state, points: action.points };
  },
  [SET_DIMENSIONS]: (state, action) => {
    return { 
      ...state, 
      width: action.width, 
      height: action.height 
    };
  }
};

const initialState = {
  points: [],
  width: 600,
  height: 400
};

export default function stageReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
