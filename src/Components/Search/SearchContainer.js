import React, { useCallback, useRef, useState } from "react";
import { Button } from "antd";
import { useQueryLoader } from "react-relay/hooks";

import "./SearchContainer.css";
import { RepositoryNameQuery } from "../../App";
import { SearchList } from "./SearchList";

export function SearchContainer(props) {
  const [queryReference, loadQuery] = useQueryLoader(
    RepositoryNameQuery,
    props.preloadedQuery
  );
  const [searchValue, setSearchValue] = useState("");
  const [afterCursor, setAfterCursor] = useState("");
  const [isVisibleLoadMore, setIsVisibleLoadMore] = useState(false);

  const inputRef = useRef("");

  const onSearchValue = useCallback(
    (value) => {
      loadQuery({ queryString: value });
      setSearchValue(value);
    },
    [loadQuery]
  );

  const onClickBtnLoadMore = useCallback(() => {
    loadQuery({ queryString: searchValue, after: afterCursor });
  }, [searchValue, afterCursor, loadQuery]);

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
        <SearchList
          queryReference={queryReference}
          onReadyNextPage={setAfterCursor}
          onReadyLoadMoreBtn={setIsVisibleLoadMore}
        />
      </div>

      {isVisibleLoadMore && (
        <div>
          <Button onClick={onClickBtnLoadMore}>더 보기</Button>
        </div>
      )}
    </div>
  );
}
