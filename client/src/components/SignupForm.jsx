// import from Apollo to integrate GraphQL
import { useMutation } from '@apollo/client';
// see SignupForm.js for comments
import { useState } from 'react';
import { Form, Button, Alert, Input, message } from 'antd';

// Apollo/GraphQL
import { ADD_USER } from '../utils/mutations.js';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  // setup allows communication with GraphQL 
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleFormSubmit = async (values) => {
    try {
      const { data } = await addUser({
        variables: { ...values },
      });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      const errorMessage = err.message.includes('duplicate key error')
      ? 'This email is already taken!'
      : 'Something went wrong with creating your login credentials!';
      setShowAlert({message: errorMessage});
    }
  };

  return (
    <>
    {showAlert && (
      <Alert
      message="Something went wrong with creating your login credentials!"
      closable
      onClose={() => setShowAlert(false)}
      type='error'
    />
    )}
      <Form
        label="Signup" 
        name="signup"
        onFinish={handleFormSubmit}
        initialValues={{ prefName: '', email: '', password: '' }}
      >
        <Form.Item
            label="Preferred Name"
            name="prefName"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Name"/>
          </Form.Item>
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
              Sign up
            </Button>
          </Form.Item>
        </Form>
    </>
  );
};

export default SignupForm;
