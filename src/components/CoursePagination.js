/**
 * A custom pagination for the course catalog page. Can be customized for any
 * specific use
 * @author: Nana Antwi
 */

import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import PropTypes from "prop-types";

const CoursePagination = ({
  pagesCount,
  currentPage,
  maxLeft,
  maxRight,
  handlePageClick,
  handlePreviousClick,
  handleNextClick,
}) => (
  <Pagination>
    <PaginationItem>
      <PaginationItem disabled={currentPage <= 0}>
        <PaginationLink onClick={handlePreviousClick} previous href="#" />
      </PaginationItem>
    </PaginationItem>
    {[...Array(pagesCount)].map((page, i) => (
      <PaginationItem>
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink onClick={(e) => handlePageClick(e, i)} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      </PaginationItem>
    ))}
    <PaginationItem>
      <PaginationItem disabled={currentPage >= pagesCount - 1}>
        <PaginationLink onClick={handleNextClick} next href="#" />
      </PaginationItem>
    </PaginationItem>
  </Pagination>
);
CoursePagination.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  maxLeft: PropTypes.number,
  maxRight: PropTypes.number,
  handlePageClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
};
export default CoursePagination;
