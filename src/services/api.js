import axios from 'axios';
import { API_URL, USERS_ENDPOINT, INITIAL_ID } from '../constants/index';
import { EMPTY_PROFILE } from '../constants/actions';
import {
  LOAD_PROFILES,
  PROFILES_LOADED,
  LOAD_PROFILE,
  PROFILE_LOADED
} from '../constants/actions';

const api = store => next => async action => {
  next(action);
  const { type } = action;
  switch (type) {
    case LOAD_PROFILES:
      const loadedProfiles = await axios.get(
        `${API_URL}/${USERS_ENDPOINT}?since=${INITIAL_ID}&per_page=12`
      );
      next({
        type: PROFILES_LOADED,
        loadedProfiles
      });
      break;
    case LOAD_PROFILE:
      next({
        type: EMPTY_PROFILE
        /* This should be isolated as an individual action, but we are being lazy here 👀  */
      });
      const loadedProfile = await axios.get(
        `${API_URL}/${USERS_ENDPOINT}/${action.id}`
      );
      next({
        type: PROFILE_LOADED,
        loadedProfile
      });
      break;
    default:
      break;
  }
};

export default api;
