import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Modal, Tabs, Form, Input, Button } from 'antd';

const { TabPane } = Tabs;
import Auth from "../utils/auth";

const Navbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogin = (values) => {
    console.log('Login values:', values);
    // Handle login logic here
  };

  const handleSignUp = (values) => {
    console.log('Sign up values:', values);
    // Handle sign up logic here
  };

  return (
    <>
      <Menu mode="horizontal" theme="dark" >
        <Menu.Item key="draw">
          <Link to="/">Draw</Link>
        </Menu.Item>
        <Menu.Item key="cards">
        <Link to="/cards">Cards</Link>
        </Menu.Item>
        {/*  */}
        {Auth.loggedIn() ? (
         <Menu.Item key="profile">
         <Link to="/profile">Profile</Link>
       </Menu.Item>
       ) : ( 
          <Menu.Item key="login" onClick={showModal}>
            Login/Sign up
          </Menu.Item> 
        )}
        
      </Menu>

      <Modal
        title="Login/Sign up"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Login" key="1">
            Login Form
          </TabPane>
          <TabPane tab="Sign up" key="2">
            Sign Up Form
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default Navbar;