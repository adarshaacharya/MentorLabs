import { Input } from 'antd';
import { useAppSelector } from 'hooks';
import * as React from 'react';
import * as wss from 'services/wss';
import { Message } from 'types';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

const ChatMessage = ({ message }: { message: Message }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { userId, name, text } = message;

  const messageCreatedByMe = user.id === userId;
  const contentAdditionalStyles = messageCreatedByMe ? 'message_right_styles' : 'message_left_styles';

  const authorText = messageCreatedByMe ? 'You' : name;

  return (
    <div className="message__container">
      <div className="message__author">{authorText}</div>
      <div className={`message__text ${contentAdditionalStyles}`}>{text}</div>
    </div>
  );
};

export const ChatBox = () => {
  const [text, setText] = React.useState('');
  const { messages, id: roomId } = useAppSelector((state) => state.room);
  const { user } = useAppSelector((state) => state.auth);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    if (text.length > 0) {
      const messageData = { userId: user.id, name: user.name, text, roomId };
      wss.sendNewMessage(messageData);
      setText('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat-box">
      <div className="chat-box__messages">
        {messages.map((message) => (
          <div key={uuidv4()}>
            <ChatMessage message={message} />
            <div ref={messagesEndRef} />
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
