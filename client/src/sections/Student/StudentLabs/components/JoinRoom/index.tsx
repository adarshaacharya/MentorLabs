import { Button, Form, Input, Typography } from 'antd';
import { SOCKETS_EVENT } from 'constants/socketEvents';
import { useAppSelector } from 'hooks';
import { useNavigate } from 'react-router';
import { JoinRoomData } from 'types';
import { displayErrorMessage } from 'utils/notifications';
import { socket } from 'utils/socketConfig';
const { Text } = Typography;

type SocketError = {
  error: string;
};

type RoomResponse = {
  id: string;
  title: string;
};

export const JoinRoom = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const onFormSubmit = (values: JoinRoomData) => {
    const roomData = { participantId: user.id, roomId: values.roomId };

    socket.emit(SOCKETS_EVENT.JOIN_ROOM, roomData, ({ error }: SocketError) => {
      if (error) {
        return displayErrorMessage(error);
      }
    });

    socket.on(SOCKETS_EVENT.JOINED_ROOM, (room: RoomResponse) => {
      navigate(`/room/${room.id}`);
    });
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
