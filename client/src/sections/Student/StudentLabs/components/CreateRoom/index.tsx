import { Button, Form, Input, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { createRoom } from 'store/room/room.action';
import { setIsRoomHost } from 'store/room/room.slice';
const { Text } = Typography;

export const CreateRoom = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { id, status } = useAppSelector((state) => state.room);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (status === 'resolved' && id) {
      navigate(`/room/${id}`);
    }
  }, [id]);

  React.useEffect(() => {
    dispatch(setIsRoomHost(true));
  }, []);

  const onFormSubmit = (values: { title: string }) => {
    const roomData = { creatorId: user.id, title: values.title };
    dispatch(createRoom(roomData));
  };

  const loading = status === 'pending';

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
            {
              min: 2,
              message: 'Title length should be minimum 2 characters!',
            },
            {
              max: 20,
              message: 'Title length should be maximum 20 characters!',
            },
          ]}
        >
          <Input placeholder="meaningful room title.." />
        </Form.Item>
        <Button block type="primary" htmlType="submit" loading={loading}>
          create room
        </Button>
      </Form>
      <Text type="secondary">
        The room title is used to show title of your session. Room id will be automatically generated for you.
      </Text>
    </div>
  );
};
