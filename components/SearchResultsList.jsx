import React from "react";

const SearchResultsList = ({ restaurantResult }) => {
  return (
    <div className="results-list">
      {restaurantResult.map((result, id) => {
        return (
          <div
            key={id}
            className="search-result"
            onClick={(e) => alert(`You selected ${result}!`)}
          >
            {result}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResultsList;
