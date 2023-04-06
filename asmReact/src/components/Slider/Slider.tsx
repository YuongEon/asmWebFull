import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import {
  RobotOutlined,
  SkinOutlined,
  FolderOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";

const Slider = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
      >
        <Menu.Item icon={<RobotOutlined />}>
          <Link to={''}>Admin Page</Link>
        </Menu.Item>
        <SubMenu key="product" icon={<SkinOutlined />} title="Product">
          <Menu.Item>
            <Link to={'/admin/products'}>All product</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/admin/products/add'}>Add product</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="categories" icon={<FolderOutlined />} title="Categories">
          <Menu.Item>
            <Link to={'/admin/categories'}>All categories</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={'/admin/categories/add'}>Add categories</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default Slider;
