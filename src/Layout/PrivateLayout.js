import "antd/dist/antd.css";
import React from "react";
import "../style/Layout.css";
import { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdStarHalf } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { BiMovie } from "react-icons/bi";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { BsFillCalendarWeekFill } from "react-icons/bs";
import { BsNewspaper } from "react-icons/bs";
import { FaChair } from "react-icons/fa"
import { Link } from "react-router-dom";
import { ADVERTISEMENT, LOGIN, MOVIE, NEWS, ROOM, SEAT, SHOWTIME, TICKET, USER } from "../config/path";
import Logo from "../asset/Logo-main.png";
import axios from "axios";
import Cookies from "cookies-js";
import { API_LOGOUT } from "../config/endpointapi";
import { useHistory } from "react-router-dom";

const PrivateLayout = ({ children }) => {
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const history = useHistory();
  const [slidebar, setSlidebar] = useState(false);
  const onCollapsed = () => {
    setSlidebar(!slidebar);
  };

  const onLogout = async () => {
    await axios
      .post(API_LOGOUT)
      .then((res) => {
        alert(res?.data?.message);
        Cookies.expire("token")
        Cookies.expire("data")
        history.push(LOGIN);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="layout">
      <Layout style={{ minHeight: "100vh", textAlign: "center" }}>
        <Sider collapsible onCollapse={slidebar}>
          <div className="logo">
            <img style={{ width: "100%" }} className="img" src={Logo} />
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<AiOutlineHome />}>
              Trang chủ
            </Menu.Item>
            <Menu.Item key="2" icon={<BiMovie />}>
              <Link to={MOVIE}>Phim</Link>{" "}
            </Menu.Item>
            <Menu.Item key="3" icon={<IoMdStarHalf />}>
              <Link to={ADVERTISEMENT}>
              Quảng cáo
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to={USER}>Người dùng</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<BsFillDoorOpenFill />}>
              <Link to={ROOM}>Phòng chiếu</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<FaChair />}>
              <Link to={SEAT}>Ghế ngồi</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<BsNewspaper />}>
              <Link to={NEWS}>Tin tức</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<BsFillCalendarWeekFill />}>
              <Link to={SHOWTIME}>Suất chiếu</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<BsFillCalendarWeekFill />}>
              <Link to={TICKET}>Vé</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 10 }}>
            <div style={{ float: "right", fontSize: 24, cursor: "pointer" }} onClick={onLogout}>
              Thoát
              <MdLogout style={{ padding: 0 }} />
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            LongDT Cinema Created by Đặng Tuấn Long
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
export default PrivateLayout;
