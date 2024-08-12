import { useState } from "react";
import { Form, Input, Button } from 'antd';

// To save data to the user
import Auth from '../utils/auth';

const DrawCards = () => {

  const styles = {
    input: {
      textAlign: "center",
      maxWidth: 650
    }
  }

  const [form] = Form.useForm();

  const saveQuery = (query) => {
    console.log(`Success: ${query}`);
  };

  const errorQuery = (error) => {
    console.log(`Error: ${error}`);
  };

  // Using Array method in JS to create a new array of length 78 of undefined elements
  // map into the array, assigning it a value from 1 to 78 inclusive
  // since the elements are undefined, use _ to represent the element, then using its index, map the index + 1
  const initialCards = Array.from({ length: 78 }, (_, i) => i + 1)

  return (
    <main className="container">
      <h1>Tarot Reading</h1>
      <p>Awaken your inner thoughts and seek another perspective to gain clarity with a 3-card Tarot spread.</p>
      <Form
        name="query"
        onFinish={saveQuery}
        onFinishFailed={errorQuery}
        layout="vertical"
      >
        <Form.Item
          name="queryQuestion"
        >
          <Input 
            placeholder="Enter your query here (optional)"
            style={styles.input}
          />
        </Form.Item>
      </Form>

    </main>
  );
};

export default DrawCards;
