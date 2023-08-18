import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_RESET_ERROR,
  UI_SIGNUP_FAILURE,
  UI_SIGNUP_SUCCESS,
  UI_SIGNUP_REQUEST,
  UI_DELETE_USER_REQUEST,
  UI_DELETE_USER_SUCCESS,
  UI_DELETE_USER_FAILURE,
} from './types';

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

export const resetErrors = () => ({
  //borramos error
  type: UI_RESET_ERROR,
});

/*Create New User */
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


/*Delete User */

export const uiDeleteUserFailure = error => ({
  type: UI_DELETE_USER_FAILURE,
  error: true,
  payload: error,
});

export const uiDeleteUserSuccess = () => ({
  type: UI_DELETE_USER_SUCCESS,
});

export const uiDeleteUserRequest = () => ({
  type: UI_DELETE_USER_REQUEST,
});

export const authDeleteUser = data =>
  async function (dispatch, _getState, { api, router }) {
    dispatch(uiDeleteUserRequest());
    if (data.password === data.passwordConfirm) {
      try {
        console.log("data",data)
        const DeleteUser = await api.auth.deleteUser(data, {
          headers: { 'content-type': 'multipart/form-data' },
        });

        //const DeleteUser = await api.auth.deleteUser(data);

        if (DeleteUser?.status === 'OK') {

          dispatch(uiDeleteUserSuccess());
          await dispatch(authLogout());

        } else {
          dispatch(uiDeleteUserFailure(DeleteUser?.message));
        }
      } catch (error) {
        dispatch(uiDeleteUserFailure(error?.message));
      }
    } else {
      dispatch(uiDeleteUserFailure('password confirmation does not match'));
    }
  };
