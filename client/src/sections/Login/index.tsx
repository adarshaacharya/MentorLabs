import { Card, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { logIn } from 'store/auth/auth.actions';
import { LoginData } from 'types';
import { displayErrorMessage } from 'utils/notifications';
import loginImg from './assets/login.svg';

const { Item } = Form;

export const Login = () => {
  const { error, loading, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onFormSubmit = ({ email, password }: LoginData) => {
    dispatch(logIn({ email, password }));
  };

  // error && displayErrorMessage(error);

  return (
    <section className="login">
      <div className="container">
        <div className="login__wrapper">
          <div className="login__banner">
            <div className="login__img">
              <img src={loginImg} alt="login" />
            </div>
          </div>

          <Card className="login__card">
            <h1 className="login__title">Sign in to your account.</h1>
            <Form layout="vertical" size="large" onFinish={onFormSubmit}>
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
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password' },
                  { min: 4, message: 'Password must be minimum 4 characters long.' },
                ]}
              >
                <Input.Password />
              </Item>

              <button
                type="submit"
                className={`btn--primary login__btn ${loading ? 'btn--loading' : ''}`}
                disabled={loading}
              >
                Log In
              </button>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
};
