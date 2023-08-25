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
  client.put(`/api/travels/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
