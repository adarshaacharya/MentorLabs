import { Layout, Form, Input, Select, Button, Card } from 'antd';
import { UserRole } from 'constants/options';
import signupImg from './assets/signup.svg';

const { Content } = Layout;
const { Item } = Form;
const { Password } = Input;

export const CreateAccount = () => {
  return (
    <Content className="signup">
      <div className="container">
        <div className="signup__wrapper">
          <div className="signup__banner">
            <div className="signup__img">
              <img src={signupImg} alt="signup" />
            </div>
          </div>

          <Card className="signup__form">
            <h1 className="signup__title">Create your account for free.</h1>
            <Form layout="vertical">
              <Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name',
                  },
                  { min: 4, message: 'Name must be min 4 characters.' },
                ]}
              >
                <Input />
              </Item>

              <Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Item>

              <Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  { min: 4, message: 'Password must be minimum 4 characters long.' },
                ]}
                hasFeedback
              >
                <Password />
              </Item>

              <Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords that you entered do not match!');
                    },
                  }),
                ]}
              >
                <Password />
              </Item>

              <Item label="Role">
                <Select defaultValue={UserRole.Student}>
                  <Select.Option value={UserRole.Student}>Student</Select.Option>
                  <Select.Option value={UserRole.Teacher}>Teacher</Select.Option>
                </Select>
              </Item>

              <button className="signup__btn">Create Account</button>
            </Form>
          </Card>
        </div>
      </div>
    </Content>
  );
};
