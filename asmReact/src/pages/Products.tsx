import React, { useEffect, useState } from "react";
import ItemListGrid from "../components/ItemList/ItemListGrid";
import Pagination from "../components/Panigation/Pagination";
import { IProduct } from "../types/products";

interface IProps {
  [key: string]: any,
  products: IProduct[]
}

const Products = ({products, onOptions}: IProps) => {
  
  const [page, setPage] = useState<number>(1)

  const options = {
    _page: page,
    _limit: 1
  }

  useEffect(() => {
    onOptions(options)
  }, [page])
  
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>

          <p className="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        <div className="mt-8">
          <p className="text-right text-sm text-gray-500">
            Showing <span> 4 </span> of 40
          </p>
        </div>
        <Pagination products={products} setPage={setPage}/>

      </div>
    </section>
  );
};

export default Products;
