import MagicString from "magic-string";
import graphqlQueryCompress from "graphql-query-compress";

const graphQLQueryCompactor = () => ({
  script({ content }) {
    const GRAPHQL = "@graphql";
    const result = new MagicString(content);

    const queryStartIndex = content.indexOf(GRAPHQL);
    const queryEndIndex = content.lastIndexOf(GRAPHQL);

    const queryContent = result.slice(
      queryStartIndex + GRAPHQL.length,
      queryEndIndex
    );

    if (queryStartIndex != -1 && queryEndIndex != -1) {
      result.overwrite(
        queryStartIndex,
        queryEndIndex + GRAPHQL.length,
        graphqlQueryCompress(queryContent)
      );
    }

    return {
      code: result.toString()
    };
  }
});
export default graphQLQueryCompactor;
