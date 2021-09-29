import { Button, Form, Input, Typography } from 'antd';
import { useAppSelector } from 'hooks';
import { useNavigate } from 'react-router';
import { createRoom } from 'services/webSockets';

const { Text } = Typography;

export const CreateRoom = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const onFormSubmit = ({ title }: { title: string }) => {
    const roomData = { creatorId: user.id, title };
    createRoom(roomData);
  };

  return (
    <div className="create-room">
      <Form layout="vertical" size="large" className="py-1" onFinish={onFormSubmit}>
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
        <Button block type="primary" htmlType="submit">
          create room
        </Button>
      </Form>
      <Text type="secondary">
        The room title is used to show title of your session. Room id will be automatically generated for you.
      </Text>
    </div>
  );
};
