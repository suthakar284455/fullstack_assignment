import React from "react";
import AutocompleteSearch from "./autoCompleteSearch";

const ScanDetails = props => {
  return (
    <div className="scan-list">
      <div>Scan list</div>
      {props.scan_details.data && (
        <AutocompleteSearch
          scan_details={props.scan_details.data}
          clickHandler={props.clickHandler.bind(this)}
        />
      )}
    </div>
  );
};

export default ScanDetails;
