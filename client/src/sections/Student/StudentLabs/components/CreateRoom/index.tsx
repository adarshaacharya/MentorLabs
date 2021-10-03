import { Button, Form, Input, Typography } from 'antd';
import * as React from 'react';
import { SOCKETS_EVENT } from 'constants/socketEvents';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useNavigate } from 'react-router';
import { createRoom } from 'store/room/room.action';
import { displayErrorMessage } from 'utils/notifications';
import { socket } from 'utils/socketConfig';
const { Text } = Typography;

type RoomResponse = {
  roomId: string;
  title: string;
};

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
