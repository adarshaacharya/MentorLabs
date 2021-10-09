import { Drawer, Input } from 'antd';
import { SOCKETS_EVENT } from 'constants/socketEvents';
import { useAppDispatch, useAppSelector } from 'hooks';
import * as React from 'react';
import { setRoomMessages } from 'store/room/room.slice';
import { Message } from 'types';
import { socket } from 'utils/socketConfig';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

export const ChatBox = () => {
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

    const messageData = { text, id: id };
    socket.emit(SOCKETS_EVENT.SEND_MESSAGE, messageData, () => setText(''));
  };

  return (
    <div className="chat-box">
      <div className="chat-box__messages">
        {messages.map((message) => (
          <div key={uuidv4()}>
            {message.notification ? (
              <p className="chat-box__message--incoming">{message.text}</p>
            ) : (
              <p className="chat-box__message--outgoing">{message.text}</p>
            )}
          </div>
        ))}
      </div>
      <div className="chat-box__input">
        <TextArea
          rows={2}
          placeholder="Press enter to send"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={sendMessage}
          size="small"
        />
      </div>
    </div>
  );
};
