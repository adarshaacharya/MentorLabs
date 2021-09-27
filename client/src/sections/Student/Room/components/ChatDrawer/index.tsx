import * as React from 'react';
import { Card, Drawer, Input, Typography } from 'antd';

type ChatDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

const { TextArea } = Input;

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ visible, onClose }) => {
  const [message, setMessage] = React.useState('');
  console.log(visible);

  const sendMessage = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setMessage('');
  };

  return (
    <div className="chat-drawer my-2">
      <Drawer placement="right" title="Chat" onClose={onClose} visible={visible} width={300}>
        <div className="chat-drawer__messages">
          <p className="chat-drawer__message--incoming">Hi boys whaddap!</p>
          <p className="chat-drawer__message--outgoing">Fine buddy!</p>
        </div>
        <div className="chat-drawer__input">
          <TextArea
            rows={2}
            placeholder="Press enter to send message.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onPressEnter={sendMessage}
          />
        </div>
      </Drawer>
    </div>
  );
};
