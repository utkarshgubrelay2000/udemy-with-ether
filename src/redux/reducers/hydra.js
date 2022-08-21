import { HYDRATE } from 'next-redux-wrapper';

export default (state = {tick: 'init'}, action) => {
  switch (action.type) {
      case HYDRATE:
          return {
              ...state,
              server: {
                  ...state.server,
                  ...action.payload.server
              }
          }
      case 'SERVER_ACTION':
          return {
              ...state,
              server: {
                  ...state.server,
                  tick: action.payload
              }
          };
      case 'CLIENT_ACTION':
          return {
              ...state,
              client: {
                  ...state.client,
                  tick: action.payload
              }
          };
      default:
          return state;
  }
};
