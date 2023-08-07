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
    });
  };
  
  export const logout = () => {
    return Promise.resolve().then(() => {
      removeAuthorizationHeader();
      storage.remove('auth');
    });
  };