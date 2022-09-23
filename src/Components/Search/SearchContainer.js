import React, { useCallback, useState } from "react";
import { Button, List } from "antd";
import Search from "antd/lib/input/Search";
import { usePreloadedQuery, useQueryLoader } from "react-relay/hooks";

import "./SearchContainer.css";
import { RepositoryNameQuery } from "../../App";

export function SearchContainer(props) {
  const [queryReference, loadQuery] = useQueryLoader(
    RepositoryNameQuery,
    props.preloadedQuery /* e.g. provided by router */
  );
  const [searchValue, setSearchValue] = useState("");

  const onSearchValue = useCallback((value) => {
    setSearchValue(value);
    loadQuery({ queryString: value });
  }, []);

  return (
    <div className="search-container">
      <div className="search">
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={onSearchValue}
        />
      </div>

      <div className="search-list">
        <NameDisplay queryReference={queryReference} />
      </div>
    </div>
  );
}

function NameDisplay({ queryReference }) {
  const data = usePreloadedQuery(RepositoryNameQuery, queryReference);
  console.log(data.search);
  // return <h1>{data.search}</h1>;

  return (
    <List
      dataSource={data.search.edges}
      renderItem={(item) => {
        return (
          <List.Item
            actions={[
              <span>
                <Button icon="star">{item.node.stargazerCount}</Button>
              </span>,
            ]}
          >
            <List.Item.Meta
              title={item.node.name}
              description={item.node.description}
            />
          </List.Item>
        );
      }}
    />
  );
}
