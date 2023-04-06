import React, { useEffect, useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Space, Tag, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { IProduct } from "../../../../types/products";
import ItemListTable from "../../../../components/ItemList/ItimeListTable/ItemListTable";
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);


const AdminProducts = (props: any) => {
  const { docs } = props.products;
  const {onDelete, onKeyword} = props;

  const[data, setData] = useState<IProduct[]>([])

  useEffect(() => {
    setData(docs);
  }, [props])

  const deleteProduct = (id: any) => {
    onDelete(id);
  }

  const onSearch = (value: string) => onKeyword(value);

  const onHandleChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    
    onKeyword(e.target.value)
  }

  const columns: ColumnsType<IProduct> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img style={{ width: "100px" }} src={image} alt="Product image" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (record1, record2) : any => {
        return record1.price > record2.price
      }, 
      render: (price) => <span>${price}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) => <span>{description?.substring(0, 50)}</span>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      render: (_id) => (
        <Space size="middle">
          <Link to={`/admin/products/${_id}`}>Update</Link>
          <a onClick={() => deleteProduct(_id)}>Delete</a>
        </Space>
      ),
    },
  ];
  
  return (
    <div>
      <Search placeholder="nhập tên sản phẩm" allowClear onChange={onHandleChange}  style={{ width: 200, marginBottom: '20px' }} />
      <ItemListTable columns={columns} data={data} />
    </div>
  );
};

export default AdminProducts;
