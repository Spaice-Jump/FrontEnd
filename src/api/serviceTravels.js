import client from "./client";

export function getTravels() {
  return client.get("/api/travels");
}

export function getTravel(id) {
  return client.get(`/api/travels/${id}`);
}

export function postTravel(data) {
  return client.post("/api/travels", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function deleteTravel(id) {
  return client.delete(`/api/travels/${id}`);
}

export function getLocations() {
  return client.get("/api/locations");
}

export function editTravel(id, data) {
  return client.put(`/api/travels/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function deletePhoto(photoName) {
  return client.delete(`/api/travels/deletePhoto/${photoName}`);
}


export const getTravelUser = (user, headers) => {
    const URL = "/api/travels/users";
    return client.post(URL, user, headers);
  };
