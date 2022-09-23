import { Button, List } from "antd";
import { useMutation, usePreloadedQuery } from "react-relay";
import { RepositoryNameQuery } from "../../App";
import graphql from "babel-plugin-relay/macro";
import { useCallback, useState } from "react";

import "./SearchList.css";

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

export function SearchList({ queryReference }) {
  const data = usePreloadedQuery(RepositoryNameQuery, queryReference);
  const [addStarCommit] = useMutation(AddStarRepoMutation);
  const [removeStarCommit] = useMutation(RemoveStarRepoMutation);

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

  return (
    <div className="search-list-component">
      <List
        dataSource={data.search.edges}
        renderItem={(item) => {
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
                    className={viewerHasStarred && "has-starred"}
                  >
                    {stargazerCount}
                  </Button>
                </span>,
              ]}
            >
              <List.Item.Meta title={name} description={description} />
            </List.Item>
          );
        }}
      />
    </div>
  );
}