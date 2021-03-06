const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_API_URL
    : process.env.PROD_API_URL;

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
