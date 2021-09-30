import { Button, Form, Input, Typography } from 'antd';
import { SOCKETS_EVENT } from 'constants/socketEvents';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useNavigate } from 'react-router';
import { emitCreateRoom } from 'services/webSockets';
import { setRoomTitle } from 'store/room/room.slice';
import { socket } from 'utils/socketConfig';

const { Text } = Typography;

type RoomResponse = {
  id: string;
  title: string;
};

export const CreateRoom = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const onFormSubmit = (values: { title: string }) => {
    const roomData = { creatorId: user.id, title: values.title };
    emitCreateRoom(roomData);

    socket.on(SOCKETS_EVENT.UPDATE_ROOM, (room: RoomResponse) => {
      dispatch(setRoomTitle(room.title));
      navigate(`/room/${room.id}`);
    });
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
