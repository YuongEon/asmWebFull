import React from 'react'
import type { ColumnsType } from "antd/es/table";
import { Space, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import ItemListTable from "../../../../components/ItemList/ItimeListTable/ItemListTable";
import { Category } from '../../../../types/categoryType';



const AdminCategories = (props: any) => {
  const {onDelete} = props;

  const columns: ColumnsType<Category> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (_id) => (
        <Space size="middle">
          <Link to={`/admin/categories/${_id}`}>Update</Link>
          <a onClick={() => onDelete(_id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const {categories: data} = props;
  return (
    <ItemListTable columns={columns} data={data} />
  )
}

export default AdminCategories