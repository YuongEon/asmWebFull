import React, { useEffect, useState } from "react";
import ItemListGrid from "../ItemList/ItemListGrid";

interface IPagination {
  [key: string]: any;
}

const Pagination = ({ products, setPage }: IPagination) => {
  const [totalPage, setTotalPage] = useState<number>(0);
  const { page, limit, hasNextPage, hasPrevPage } = products;
  

  useEffect(() => {
    setTotalPage(products.totalPages);
  }, [page, limit]);

  return (
    <div>
      <ItemListGrid data={products} />
      <ol className="flex justify-center gap-1 text-xs font-medium">
        <li>
          <button
            disabled={!hasPrevPage}
            onClick={() => setPage((currentPage:number) => {
              if(currentPage > 1){
                return currentPage - 1
              } else {
                return 1
              }
            })}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
          >
            <span className="sr-only">Prev Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>

        {Array.from({ length: totalPage }, (_: any, i: number) => i + 1).map(
          (pageNumber: number) => {
            if(page == pageNumber){
              return (
                <li key={pageNumber} className="block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
                {pageNumber}
                </li>
              )
            }
            return (
              <li key={pageNumber}>
                <button
                  onClick={() => setPage(pageNumber)}
                  className="block h-8 w-8 rounded border border-gray-100 text-center leading-8"
                >
                  {pageNumber}
                </button>
              </li>
            );
          }
        )}

        <li>
          <button
            disabled={!hasNextPage}
            onClick={() => setPage((currentPage:number) => {
              if(currentPage < totalPage){
                return currentPage + 1
              } else {
                return currentPage
              }
            } )}
            className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
          >
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ol>
      <div>
        
      </div>
    </div>
  );
};

export default Pagination;