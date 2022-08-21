import React, { useEffect, useState } from "react";

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default (props) => {
  const [numOfPages, setNumOfPages] = useState(10);

  useEffect(() => {
    setNumOfPages(props.numOfPages);
  }, []);

  return (
    <Pagination
      aria-label="Page navigation example"
      className="d-flex justify-content-center"
    >
      <PaginationItem>
        <PaginationLink href="#">
          <i className="fa fa-angle-left" />
        </PaginationLink>
      </PaginationItem>
      <PaginationItem className="active">
        <PaginationLink href="?page=1">1</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="?page=2">2</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">3</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          <i className="fa fa-angle-right" />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};
