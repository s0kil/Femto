import cache from "node-cache";
import { graphql } from "graphql";
import jsonParser from "fast-json-body";
import { resolvers } from "./resolvers";
import { schema } from "./schema.js";
import stringHash from "string-hash";
// import json from "like-json";

// TODO : Figure Out A Way To Create Persistent Cache With Updates
const queryCache = new cache({
  stdTTL: 60 * 60 * 1 // cache for 1 Hour
});

export async function apiHandler(request, response) {
  jsonParser(request, (error, body) => {
    if (error) {
      console.error(error);

      response.writeHead(404, {
        "Content-Type": "application/json"
      });

      response.end(
        JSON.stringify({
          message: `Not found`
        })
      );
    }

    const variables =
      body.variables !== undefined ? JSON.parse(body.variables) : null;

    // Compute A Unique String Hash Based On GraphQL (Query + Variables)
    const queryHash = stringHash(body.query + body.variables || "");

    queryCache.get(queryHash, (err, value) => {
      if (!err) {
        if (value !== undefined) {
          response.end(value);
        } else {
          graphql({
            schema: schema,
            source: body.query,
            variableValues: variables,
            operationName: body.operationName,
            rootValue: resolvers
          })
            .then(queryData => {
              const responseData = JSON.stringify(queryData);

              if (!queryData.errors) {
                queryCache.set(queryHash, responseData, (error, success) => {
                  if (error) console.error(error);
                });
              }

              response.end(responseData);
            })
            .catch(error => console.error(error));
        }
      }
    });
  });

  // queryCache.flushAll();
  // console.log(queryCache.getStats());
}
