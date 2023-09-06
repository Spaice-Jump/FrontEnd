export const getIsLogged = state => state.auth.isLogged;
export const getUserId = state => state.auth.userId;
export const getEmail= state=> state.auth.email;
export const getUserName= state=> state.auth.userName;
export const getUi = state => state.ui;

export const getLocations = state => state.locations;
export const getTravels = state => state.travels.data;
export const getTravelById = id => state => {
  //console.log('state.travels.data', state.travels.data);
  console.log('id', id);
  console.log('state', state)
  console.log('state.travels', state.travels)
  return state.travels.data.find(travel => travel._id === id);
};
