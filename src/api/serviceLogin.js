import client, {
    removeAuthorizationHeader,
    setAuthorizationHeader,
  } from './client';
  import storage from '../layout/utils/storage.js';
  
  export const login = (credentials, isChecked) => {
    return client.post('/login', credentials).then(response => {
        
      if(response?.status===400){
        throw(response.error)
      }
      setAuthorizationHeader(response.jwt); //pone el token en la cabecera por defecto
      if (isChecked) {
        storage.set('auth', response.jwt); //guarda el token en el localStorage
      }
      return response.userId 
    });
  };
  
  export const logout = () => {
    return Promise.resolve().then(() => {
      removeAuthorizationHeader();
      storage.remove('auth');
    });
  };

  export const signUp = (user,headers) => {
    const signUp_URL = process.env.REACT_APP_API_SIGNUP_URL;
    console.log(user)
    console.log(headers)
    return client.post(signUp_URL, user, headers);
  
  };