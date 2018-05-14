import Immutable from 'immutable';
import axios from 'axios';

const defaultState = Immutable.fromJS({
});

export const actions = {
};

const ACTION_HANDLERS = {
};

export default function appReducer(state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}