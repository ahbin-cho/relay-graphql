import React from "react";
import graphql from "babel-plugin-relay/macro";
import { loadQuery, RelayEnvironmentProvider } from "react-relay/hooks";

import "./App.css";
import { SearchContainer } from "./Components/Search/SearchContainer";
import RelayEnvironment from "./RelayEnvironment";
const { Suspense } = React;

// Define a query
export const RepositoryNameQuery = graphql`
  query AppRepositoryNameQuery($queryString: String!) {
    search(type: REPOSITORY, first: 10, query: $queryString) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            stargazerCount
          }
        }
      }
    }
  }
`;

const preloadedQuery = loadQuery(RelayEnvironment, RepositoryNameQuery, {
  /* query variables */
  queryString: "",
});

function App() {
  // const data = usePreloadedQuery(RepositoryNameQuery, props.preloadedQuery);

  return (
    <div className="App">
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <Suspense fallback={"Loading..."}>
          {/* <App preloadedQuery={preloadedQuery} /> */}
          <SearchContainer preloadedQuery={preloadedQuery} />
        </Suspense>
      </RelayEnvironmentProvider>
      {/* <p>{data.repositoryOwner.avatarUrl}</p> */}
      {/* <SearchContainer /> */}
    </div>
  );
}

export default App;
