import { Typography } from 'antd';

type EmptyPageMessageProps = {
  title?: string;
  message: string;
};
const { Paragraph } = Typography;

export const EmptyPageMessage: React.FC<EmptyPageMessageProps> = ({ message }) => {
  return (
    <div className="empty-page">
      <Paragraph type="secondary">{message}</Paragraph>
    </div>
  );
};
