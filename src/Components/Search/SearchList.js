import { Button, List } from "antd";
import { useMutation, usePreloadedQuery } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { useCallback, useEffect, useState } from "react";

import "./SearchList.css";
import { RepositoryNameQuery } from "../../Root/App";

const AddStarRepoMutation = graphql`
  mutation SearchListAddStarMutation($starrableId: ID!) {
    addStar(input: { starrableId: $starrableId }) {
      starrable {
        stargazerCount
        id
        viewerHasStarred
      }
    }
  }
`;
const RemoveStarRepoMutation = graphql`
  mutation SearchListRemoveStarMutation($starrableId: ID!) {
    removeStar(input: { starrableId: $starrableId }) {
      starrable {
        stargazerCount
        id
        viewerHasStarred
      }
    }
  }
`;

export function SearchList({
  queryReference,
  onReadyNextPage,
  onReadyLoadMoreBtn,
}) {
  const data = usePreloadedQuery(RepositoryNameQuery, queryReference);
  const [addStarCommit] = useMutation(AddStarRepoMutation);
  const [removeStarCommit] = useMutation(RemoveStarRepoMutation);

  const [searchList, setSearchList] = useState([]);

  const onClickBtnStar = useCallback(
    (id, hasStarred) => {
      if (!hasStarred) {
        addStarCommit({ variables: { starrableId: id } });
      } else {
        removeStarCommit({ variables: { starrableId: id } });
      }
    },
    [addStarCommit, removeStarCommit]
  );

  //   useEffect(() => {
  //     const { edges, pageInfo } = data.search;
  //     const { endCursor, hasNextPage } = pageInfo;

  //     if (hasNextPage) {
  //       onReadyNextPage(endCursor);
  //       onReadyLoadMoreBtn(true);
  //     } else {
  //       onReadyLoadMoreBtn(false);
  //     }

  //     if (edges.length > 0) {
  //       setSearchList((prev) => {
  //         return [...prev, ...edges];
  //       });
  //     }
  //   }, [data, onReadyNextPage, onReadyLoadMoreBtn]);

  return (
    <div className="search-list-component">
      <List
        dataSource={data.search.edges}
        renderItem={(item) => {
          if (item) {
            const { node } = item;
            const { id, stargazerCount, viewerHasStarred, name, description } =
              node;
            return (
              <List.Item
                actions={[
                  <span>
                    <Button
                      icon="star"
                      onClick={() => {
                        onClickBtnStar(id, viewerHasStarred);
                      }}
                      className={viewerHasStarred ? "has-starred" : ""}
                    >
                      {stargazerCount}
                    </Button>
                  </span>,
                ]}
              >
                <List.Item.Meta title={name} description={description} />
              </List.Item>
            );
          }
        }}
      />
    </div>
  );
}
