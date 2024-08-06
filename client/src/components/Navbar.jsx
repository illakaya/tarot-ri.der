import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Modal, Tabs } from 'antd';
const { Header } = Layout;
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Auth from "../utils/auth";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const styles = {
    header: {
      height: "auto",
      padding: "1em 0.7em",
      display: "flex",
      alignItems: "center",
    },
    logoContainer: {
      height: "5em",
      marginRight: "auto",
      display: "flex",
      alignItems: "center",
      color: "white"
    },
    logo: {
      height: "100%",
      marginRight: "1em",
    },
  }

  const menuItems = [
    {
      key: "draw",
      label: <Link to="/">Draw</Link>
    },
    {
      key: "cards",
      label: <Link to="/cards">Cards</Link>
    },
    ...(
      Auth.loggedIn() ? [
        {
          key: "profile",
          label: <Link to="/profile">Profile</Link>
        },
        {
          key: "logout",
          label: <Link to="/" onClick={Auth.logout}>Logout</Link>
        }
        ] : [
        {
          key: "login",
          onClick: handleShowModal,
          label: "Login/Sign up"
        },
      ]
    )
  ];

  const tabsItems = [
    {
      label: "Login",
      key: "1",
      children: <LoginForm/>
    },
    {
      label: "Sign up", 
      key: "2",
      children: <SignupForm/>
    }
  ]

  return (
    <>
      <Header style={styles.header}>
        <div style={styles.logoContainer}>
          <img style={styles.logo} src="/images/tarot-icon.png" alt="logo" />
          <h1>Tarot Ri.der</h1>
        </div>
        <Menu style={styles.menu} mode="horizontal" theme="dark" items={menuItems} />
      </Header>
        <Modal
          title="Login/Sign up"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
        <Tabs defaultActiveKey="1" items={tabsItems}/>
      </Modal>
    </>
  );
};

export default Navbar;