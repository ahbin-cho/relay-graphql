import React from "react";
import graphql from "babel-plugin-relay/macro";
import { loadQuery, RelayEnvironmentProvider } from "react-relay/hooks";

import "./App.css";
import { SearchContainer } from "./Components/Search/SearchContainer";
import RelayEnvironment from "./RelayEnvironment";
const { Suspense } = React;

// Define a query
export const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery($queryString: String!, $after: String) {
    search(type: REPOSITORY, first: 10, query: $queryString, after: $after) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            stargazerCount
            viewerHasStarred
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {
  queryString: "",
});

function App() {
  return (
    <div className="App">
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Suspense fallback={"Loading..."}>
          <SearchContainer preloadedQuery={preloadedQuery} />
        </Suspense>
      </RelayEnvironmentProvider>
    </div>
  );
}

export default App;
