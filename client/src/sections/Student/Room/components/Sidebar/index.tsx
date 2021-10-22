import { Tabs } from 'antd';
import { Participants, ChatBox } from '..';

const { TabPane } = Tabs;

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Tabs defaultActiveKey="participants">
        <TabPane tab="Participants" key="participants">
          <Participants />
        </TabPane>
        <TabPane tab="Chat Box" key="chat">
          <ChatBox />
        </TabPane>
      </Tabs>
    </div>
  );
};
