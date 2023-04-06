import { Table } from "antd";
import React from "react";
import {v4 as uuidv4} from 'uuid';

const ItemListTable = (props: any) => {
  const { columns, data } = props;
  const keyId = uuidv4();
  return <Table key={keyId} columns={columns} dataSource={data} />;
};

export default ItemListTable;
