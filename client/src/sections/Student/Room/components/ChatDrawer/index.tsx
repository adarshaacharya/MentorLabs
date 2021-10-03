import { Drawer, Input } from 'antd';
import { SOCKETS_EVENT } from 'constants/socketEvents';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { setRoomMessages } from 'store/room/room.slice';
import { Message } from 'types';
import { socket } from 'utils/socketConfig';
import { v4 as uuidv4 } from 'uuid';

type ChatDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

const { TextArea } = Input;

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ visible, onClose }) => {
  const [text, setText] = React.useState('');
  const { messages, id, title } = useAppSelector((state) => state.room);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    socket.on(SOCKETS_EVENT.UPDATE_MESSAGE, (message: Message) => {
      dispatch(setRoomMessages(message));
    });
  }, []);

  const sendMessage = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const messageData = { text, roomId: id };
    socket.emit(SOCKETS_EVENT.SEND_MESSAGE, messageData, () => setText(''));
  };

  return (
    <div className="chat-drawer my-2">
      <Drawer placement="right" title="Chat" onClose={onClose} visible={visible} width={300}>
        <div className="chat-drawer__messages">
          {messages.map((message) => (
            <div key={uuidv4()}>
              {message.notification ? (
                <p className="chat-drawer__message--incoming">{message.text}</p>
              ) : (
                <p className="chat-drawer__message--outgoing">{message.text}</p>
              )}
            </div>
          ))}
        </div>
        <div className="chat-drawer__input">
          <TextArea
            rows={2}
            placeholder="Press enter to send message.."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPressEnter={sendMessage}
          />
        </div>
      </Drawer>
    </div>
  );
};
