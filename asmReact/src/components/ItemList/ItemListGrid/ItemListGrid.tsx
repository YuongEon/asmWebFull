import React from "react";
import ItemCardGrid from "./ItemCardGrid";
import { v4 as uuidv4 } from "uuid";
import { IProduct } from "../../../types/products";

interface ItemsData {
  data: IProduct[]
}

const ItemListGrid = ({ data }: any) => {
  const {docs: products} = data
  
  return (
    <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products?.map((dataItem: object) => {
        const keyId = uuidv4();
        return <ItemCardGrid key={keyId} data={dataItem} />;
      })}
    </ul>
  );
};

export default ItemListGrid;
