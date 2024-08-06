// import from Apollo to integrate GraphQL
import { useMutation } from '@apollo/client';
// see SignupForm.js for comments
import { useState } from 'react';
import { Form, Button, Alert, Input } from 'antd';

// Apollo/GraphQL
import { LOGIN_USER } from '../utils/mutations.js';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  // setup allows communication with GraphQL 
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (values) => {
    try {
      const { data } = await login({
        variables: { ...values },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <>
    {showAlert && (
      <Alert
      message="Something went wrong with your login credentials!"
      closable
      onClose={() => setShowAlert(false)}
      type='error'
    />
    )}
      <Form
        label="Login" 
        name="login"
        onFinish={handleFormSubmit}
        initialValues={{ email: '', password: '' }}
      >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email"/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
    </>
  );
};

export default LoginForm;
