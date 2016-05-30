export const RENAME_WORKSPACE = 'RENAME_WORKSPACE';

export function rename(name) {
  return { type: RENAME_WORKSPACE, name };
}

export const actions = { rename };

const ACTION_HANDLERS = {
  [RENAME_WORKSPACE]: (state, action) => {
    return { ...state, name: action.name };
  }
};

const initialState = {
  name: "Unnamed Workspace"
};

export default function workspaceReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
