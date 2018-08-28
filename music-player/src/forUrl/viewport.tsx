export const SET_VIEWPORT = 'SET_VIEWPORT';

export const viewport = (state = 'playlist', action: any) => {
  switch (action.type) {
    case SET_VIEWPORT:
      return action.viewport;
    default:
      return state;
  }
};

export const getViewport = (state: any) => state;
