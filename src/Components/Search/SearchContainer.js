import React, { useCallback, useRef } from "react";
import { Button } from "antd";
import { useQueryLoader } from "react-relay/hooks";

import "./SearchContainer.css";
import { RepositoryNameQuery } from "../../App";
import { SearchList } from "./SearchList";

export function SearchContainer(props) {
  const [queryReference, loadQuery] = useQueryLoader(
    RepositoryNameQuery,
    props.preloadedQuery /* e.g. provided by router */
  );

  const inputRef = useRef("");

  const onSearchValue = useCallback(
    (value) => {
      loadQuery({ queryString: value });
    },
    [loadQuery]
  );

  return (
    <div className="search-container">
      <div className="search">
        <input className="search-input" ref={inputRef} />
        <Button
          type="primary"
          icon="search"
          onClick={() => {
            onSearchValue(inputRef.current.value);
          }}
        >
          Search
        </Button>
      </div>

      <div className="search-list">
        <SearchList queryReference={queryReference} />
      </div>
    </div>
  );
}
