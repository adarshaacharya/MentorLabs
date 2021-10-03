import { Button, Form, Input, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { joinRoom } from 'store/room/room.action';
import { clearRoomError } from 'store/room/room.slice';
import { JoinRoomData } from 'types';
import { displayErrorMessage } from 'utils/notifications';
const { Text } = Typography;

export const JoinRoom = () => {
  const navigate = useNavigate();
  const { error, status, id } = useAppSelector((state) => state.room);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (error) {
      displayErrorMessage(error);
      dispatch(clearRoomError());
    }
  }, [error]);

  React.useEffect(() => {
    if (status === 'resolved' && id) {
      navigate(`/room/${id}`);
    }
  }, [id]);

  const onFormSubmit = (values: JoinRoomData) => {
    dispatch(joinRoom(values.roomId));
  };

  const isLoading = status === 'pending';

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
        <Button block type="primary" htmlType="submit" loading={isLoading}>
          join room
        </Button>
      </Form>
      <Text type="secondary">Join using unique room id created for each session by our labs.</Text>
    </div>
  );
};
