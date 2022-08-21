import React, { useEffect } from "react";
import SortBy from "./SortBy";

export default (props) => {
  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const results = numberWithCommas(props.results);
  const parsedResults = parseInt(results);

  return (
    <div className="d-flex justify-content-between align-items-center flex-column flex-md-row mb-4"   style={{ paddingLeft: '5%' }}>
      <div className="mr-3">
        <p className="mb-3 mb-md-0">
          <h4 style={{ display: "inline" }}>
            <span class="badge badge-success">
              {props.results}
            </span>
          </h4>
          &nbsp;{parsedResults > 1 || parsedResults === 0 ? "results found " : parsedResults > 0 ? "result found " : ""}{props.searchKey ? "for " : " "}
          <h4 style={{ display: "inline" }}>
            <span class="badge badge-pill badge-primary">
              {props.searchKey}
            </span>
          </h4>
          {props.subject.label !== "All" && props.subject.label !== "" && props.subject.label !== undefined ? " under " : ""}
          {
            <h4 style={{ display: "inline" }}>
              <span class="badge badge-pill badge-info">
                {props.subject.label !== "All" && props.subject.label !== "" ? props.subject.label : ""}
              </span>
            </h4>
          }
          {props.provider.label !== "All" && props.provider.label !== "" && props.provider.label !== undefined ? " on " : ""}
          {
            <h4 style={{ display: "inline" }}>
              <span class="badge badge-pill" style={{ backgroundColor: "#adb5bd", color: "white" }}>
                {props.provider.label !== "All" && props.provider.label !== "" ? props.provider.label : ""}
              </span>
            </h4>
          }
          {props.length.label !== "All" && props.length.label !== "" && props.length.label !== undefined ? " that are " : ""}
          {
            <h4 style={{ display: "inline" }}>
              <span class="badge badge-pill badge-secondary">
                {props.length.label !== "All" && props.length.label !== "" && props.length.label !== undefined ? props.length.label + " " : ""}
              </span>
            </h4>
          }
          {props.length.label !== "All" && props.length.label !== "" && props.length.label !== undefined ? " long" : ""}
          {props.costStructure.label !== "All" && props.costStructure.label !== "" && props.costStructure.label !== undefined ? " that are " : ""}
          {
            <h4 style={{ display: "inline" }}>
              <span class="badge badge-pill" style={{ backgroundColor: "#ffc107", color: "black" }}>
                {props.costStructure.label !== "All" && props.costStructure.label !== "" && props.costStructure.label !== undefined ? props.costStructure.label + " " : ""}
              </span>
            </h4>
          }
        </p>
      </div>
      {props.sortBy && <SortBy data={props.sortBy} />}
    </div>
  );
};
