export const baseUrl = "http://localhost:5000/";

export const endpoints = {
  auth: {
    url: baseUrl + "auth",
    method: "POST",
  },
  create: {
    url: baseUrl + "katsu/create",
    method: "POST",
  },
  index: {
    url: baseUrl + "katsus",
    method: "GET",
  },
  update: {
    url: (repo_id: number) => baseUrl + "katsu/" + repo_id,
    method: "PUT",
  },
  show: {
    url: (repo_id: number) => baseUrl + "katsu/" + repo_id,
    method: "GET",
  },
  delete: {
    url: (repo_id: number) => baseUrl + "katsu/" + repo_id,
    method: "DELETE",
  },
};
