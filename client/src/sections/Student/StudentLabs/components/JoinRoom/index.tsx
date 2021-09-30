import { Button, Form, Input, Typography } from 'antd';
import { JoinRoomData } from 'types';
const { Text } = Typography;

export const JoinRoom = () => {
  const onFormSubmit = (values: JoinRoomData) => {
    console.log(values.roomId);
  };

  return (
    <div className="join-room">
      <Form layout="vertical" size="large" className="py-1" onFinish={onFormSubmit}>
        <Form.Item
          label="Room ID"
          name="roomId"
          rules={[
            {
              required: true,
              message: 'Please input room ID!',
            },
          ]}
        >
          <Input placeholder="unique room id.." />
        </Form.Item>
        <Button block type="primary" htmlType="submit">
          join room
        </Button>
      </Form>
      <Text type="secondary">Join using unique room id created for each session by our labs.</Text>
    </div>
  );
};
