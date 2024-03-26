import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  TableOutlined,
  UserOutlined,
  CopyOutlined,
} from "@ant-design/icons"; 
import "../style/DefaultLayout.css";
import {  message } from 'antd';
const { Header, Sider, Content } = Layout;


const DefaultLayout = ({ children }) => {
  const [collapsed, setcollapsed] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const toggle = () => {
    setcollapsed(!collapsed);
  };
  // eslint-disable-next-line
  return (
    <Layout style={{minHeight:"100vh"}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div>
          <h1 className="text-center text-light font-wight-bold mt-4">Admin</h1>
          
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key="/admin" icon={<HomeOutlined />}>
            <Link to="/admin"  style={{textDecoration: "none"}}>Home</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
            <Link to="/admin/item"  style={{textDecoration: "none"}}>Items</Link>
          </Menu.Item>
          <Menu.Item key="/order" icon={<CopyOutlined />}>
            <Link to="/admin/order"  style={{textDecoration: "none"}}>Orders</Link>
          </Menu.Item>
          <Menu.Item key="/table" icon={<TableOutlined />}>
            <Link to="/admin/table"  style={{textDecoration: "none"}}>Book Table</Link>
          </Menu.Item>
          <Menu.Item key="/feedback" icon={<UserOutlined />} >
            <Link to="/admin/feedback" style={{textDecoration: "none"}}>Review</Link>
          </Menu.Item>
          <Menu.Item
            key="/logout"
            icon={<LogoutOutlined />}
            onClick={() => {
              
              localStorage.removeItem("token");
              message.success("Logout Successfully..")
             
              navigate("/admin/login");
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background ant-layout-content" 
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
