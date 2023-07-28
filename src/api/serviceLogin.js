import client, {
    removeAuthorizationHeader,
    setAuthorizationHeader,
  } from './client';
  import storage from '../utils/storage';
  
  export const login = (credentials, isChecked) => {
    return client.post('/api/auth/login', credentials).then(response => {
      setAuthorizationHeader(response.accessToken); //pone el token en la cabecera por defecto
      if (isChecked) {
        storage.set('auth', response.accessToken); //guarda el token en el localStorage
      }
    });
  };
  
  export const logout = () => {
    return Promise.resolve().then(() => {
      removeAuthorizationHeader();
      storage.remove('auth');
    });
  };