<Form
              name="signup"
              onFinish={handleSignUp}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[{ required: true, message: 'Please confirm your password!' }]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>