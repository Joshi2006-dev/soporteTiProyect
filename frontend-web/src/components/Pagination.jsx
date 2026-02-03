import React, { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

function MyPagination({ totalPages = 5, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <Pagination>
      {/* First */}
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink first onClick={() => goToPage(1)} href="#">
          {/* href="#" para que el cursor sea pointer */}
        </PaginationLink>
      </PaginationItem>

      {/* Previous */}
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          previous
          onClick={() => goToPage(currentPage - 1)}
          href="#"
        />
      </PaginationItem>

      {/* Números de página */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PaginationItem active={currentPage === page} key={page}>
          <PaginationLink onClick={() => goToPage(page)} href="#">
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}

      {/* Next */}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink
          next
          onClick={() => goToPage(currentPage + 1)}
          href="#"
        />
      </PaginationItem>

      {/* Last */}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink last onClick={() => goToPage(totalPages)} href="#" />
      </PaginationItem>
    </Pagination>
  );
}

export default MyPagination;
