import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
  UI_SIGNUP_FAILURE,
  UI_SIGNUP_REQUEST,
  UI_SIGNUP_SUCCESS,
} from './types';

//creamos el estado que va a tener por defecto
// export const defoultState = {
//     auth: false,
//     ui: {
//       isLoading: false,
//       error: null,
//     },
//   };

export const defaultState = {
  auth: {
    isLogged: false,
    userId: null,
  },
  travels: {
    areLoaded: false,
    data: [],
  },
  locations: [],
  ui: {
    isLoading: false,
    error: null,
  },
};

export function auth(state = defaultState.auth, action) {
  //esta parte del reducer solo tiene en cuenta la paerte de auth
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return { isLogged: true, userId: action.payload }; //clonamos el estado y le cambiamos la autenticacion a true o false si esta o no logeado
    case AUTH_LOGOUT:
      return { isLogged: false, userId: null };
    case AUTH_LOGIN_FAILURE:
      return { isLogged: false, userId: null };

    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return { isLoading: false, error: action.payload };
  }

  if (/_REQUEST$/.test(action.type)) {
    //todas las acciones que acaben en request
    return { isLoading: true, error: null };
  }

  if (/_SUCCESS$/.test(action.type)) {
    return { isLoading: false, error: null };
  }
  if (action.type === UI_RESET_ERROR) {
    return { ...state, error: null };
  }

  if (action.type === UI_SIGNUP_SUCCESS) {
    return { isLoading: true, error: null };
  }
  if (action.type === UI_SIGNUP_REQUEST) {
    return { isLoading: false, error:null };
  }
  if (action.type === UI_SIGNUP_FAILURE) {
    return { isLoading: false, error: action.payload };
  }

  return state;
}
