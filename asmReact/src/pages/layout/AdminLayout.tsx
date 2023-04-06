import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Breadcrumb, Layout, theme } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Slider from "../../components/Slider";
import { v4 as uuidv4 } from "uuid";

const AdminLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();
  const pathNames = location.pathname.slice(1).split('/')
  
  const upperCaseFirstLetter = (text: string): string => {
    const newText = `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
    return newText;
  }

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Slider />
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px", minHeight: "80vh" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {pathNames.map((pathname: string) => {
                const keyId = uuidv4();
                const pathnameModify = upperCaseFirstLetter(pathname);
                return  <Breadcrumb.Item key={keyId}>{pathnameModify}</Breadcrumb.Item>
              })}
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <main>
                <Outlet/>
              </main>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;
