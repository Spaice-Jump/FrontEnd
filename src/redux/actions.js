import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, UI_RESET_ERROR } from "./types";

export const authLoginRequest = () => ({
    type: AUTH_LOGIN_REQUEST,
  });
  
  export const authLoginSuccess = (userId) => ({
    //crea la accion de type authlogin para saber si esta loguedo
    type: AUTH_LOGIN_SUCCESS,
    payload: userId
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
      console.log('user',userId)
      //leguearse
      dispatch(authLoginSuccess(userId));
      const to = router.state?.from?.pathname || '/'; //cogemos la redireccion de la pagina que veniamos que nos viene de la pagina de RequireAuth
      router.navigate(to);
    } catch (error) {
      dispatch(authLoginFailure(error));

      return;
    }
  };

  export const resetErrors = ()=>({ //borramos error
      type: UI_RESET_ERROR
  })