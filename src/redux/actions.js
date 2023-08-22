import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
  UI_SIGNUP_FAILURE,
  UI_SIGNUP_SUCCESS,
  UI_SIGNUP_REQUEST,
  CREATE_TRAVEL_REQUEST,
  CREATE_TRAVEL_SUCCESS,
  CREATE_TRAVEL_FAILURE,
  AUTH_REMEMBER_PASSWORD_REQUEST,
  AUTH_REMEMBER_PASSWORD_SUCCESS,
  AUTH_REMEMBER_PASSWORD_FAILURE,
} from './types';

import { postTravel, deleteTravel } from '../api/serviceTravels';

// Travels actions:
//TODO Hay que hacer que service llegue por props {api} a través del middleware.

export const createTravelRequest = () => ({
  type: CREATE_TRAVEL_REQUEST,
});

export const createTravelSuccess = travel => ({
  type: CREATE_TRAVEL_SUCCESS,
  payload: travel,
});

export const createTravelFailure = error => ({
  type: CREATE_TRAVEL_FAILURE,
  error: true,
  payload: error,
});

export const createTravel = data =>
  async function (dispatch, _getState, { api, router }) {
    dispatch(createTravelRequest());
    try {
      const travel = await postTravel(data);
      dispatch(createTravelSuccess(travel));
      router.navigate(`/travels/${travel.id}`);
    } catch (error) {
      dispatch(createTravelFailure(error));
    }
  };

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = userId => ({
  //crea la accion de type authlogin para saber si esta loguedo
  type: AUTH_LOGIN_SUCCESS,
  payload: userId,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLogout = () => ({
  //crea la accion de type authlogout para saber si no esta loguedo
  type: AUTH_LOGOUT,
});

export const authlogin = (credential, checked) =>
  async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginRequest()); //saber si esta cargando la llamada
    try {
      const userId = await api.auth.login(credential, checked);
      console.log('user', userId);
      //leguearse
      dispatch(authLoginSuccess(userId));
      const to = router.state?.from?.pathname || '/'; //cogemos la redireccion de la pagina que veniamos que nos viene de la pagina de RequireAuth
      router.navigate(to);
    } catch (error) {
      dispatch(authLoginFailure(error));

      return;
    }
  };

export const authRememberPasswordRequest = () => ({
  type: AUTH_REMEMBER_PASSWORD_REQUEST,
});

export const authRememberPasswordSuccess = userId => ({
  //crea la accion de type authlogin para saber si esta loguedo
  type: AUTH_REMEMBER_PASSWORD_SUCCESS,
  
});

export const authRememberPasswordFailure = error => ({
  type: AUTH_REMEMBER_PASSWORD_FAILURE,
  error: true,
  payload: error,
});
export const authPassword = credential =>
  async function (dispatch, _getState, { api, router }) {
    dispatch(authRememberPasswordRequest())
    try {
      const password = await api.auth.rememberPassword(credential);
      dispatch(authRememberPasswordSuccess())
      console.log('paaaaaaaa', password);
      const to = router.state?.from?.pathname || '/login'; //cogemos la redireccion de la pagina que veniamos que nos viene de la pagina de RequireAuth
      router.navigate(to);
    } catch (error) {dispatch(authRememberPasswordFailure(error))}
  };
export const resetErrors = () => ({
  //borramos error
  type: UI_RESET_ERROR,
});

export const uiSignUpFailure = error => ({
  type: UI_SIGNUP_FAILURE,
  error: true,
  payload: error,
});

export const uiSignUpSuccess = () => ({
  type: UI_SIGNUP_SUCCESS,
});

export const uiSignUpRequest = () => ({
  type: UI_SIGNUP_REQUEST,
});

export const authSignUp = data =>
  async function (dispatch, _getState, { api, router }) {
    dispatch(uiSignUpRequest());
    if (data.password === data.passwordConfirm) {
      try {
        const newUser = await api.auth.signUp(data, {
          headers: { 'content-type': 'multipart/form-data' },
        });

        if (newUser?.status === 'OK') {
          const credential = {
            email: data.email,
            password: data.password,
          };
          dispatch(uiSignUpSuccess());
          await dispatch(authlogin(credential, true));
        } else {
          dispatch(uiSignUpFailure(newUser?.message));
        }
      } catch (error) {
        dispatch(uiSignUpFailure(error?.message));
      }
    } else {
      dispatch(uiSignUpFailure('password confirmation does not match'));
    }
  };
