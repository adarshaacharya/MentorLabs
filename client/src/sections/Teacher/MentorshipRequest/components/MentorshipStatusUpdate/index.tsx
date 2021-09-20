import { Button, Space } from 'antd';

export const MentorshipStatusUpdate = () => {
  return (
    <Space align="end" size="large">
      <Button type="primary">Accept Request</Button>
      <Button type="ghost">Reject Request</Button>
    </Space>
  );
};
