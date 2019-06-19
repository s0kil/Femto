const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://0.0.0.0:8000/api"
    : "https://evening-spire-45350.herokuapp.com/api";

export async function requestApi(queryData) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: queryData
  })
    .then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      throw error;
    });
}
