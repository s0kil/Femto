import json from "like-json";

const getOperationName = /(query|mutation) ?([\w\d-_]+)? ?\(.*?\)? \{/;

export default function graphql(queryString) {
  queryString = (Array.isArray(queryString)
    ? queryString.join("")
    : queryString
  ).trim();

  const name = getOperationName.exec(queryString);

  return function(variables) {
    let data = { query: queryString };

    if (variables) data.variables = variables;

    if (name && name.length) {
      let operationName = name[2];
      if (operationName) data.operationName = name[2];
    }

    return json.stringify(data, variables ? 2 : 1);
  };
}
