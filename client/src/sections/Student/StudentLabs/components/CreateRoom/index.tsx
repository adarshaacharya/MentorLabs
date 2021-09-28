import { Button, Form, Input, Typography } from 'antd';
import * as React from 'react';
import { useNavigate } from 'react-router';

const { Text } = Typography;

export const CreateRoom = () => {
  const navigate = useNavigate();
  return (
    <div className="create-room">
      <Form layout="vertical" size="large" className="py-1">
        <Form.Item
          label="Room Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input room title!',
            },
          ]}
        >
          <Input placeholder="meaningful room title.." />
        </Form.Item>
        <Button block type="primary" htmlType="submit" onClick={() => navigate('/room/xyz100')}>
          create room
        </Button>
      </Form>
      <Text type="secondary">
        The room title is used to show title of your session. Room id will be automatically generated for you.
      </Text>
    </div>
  );
};
